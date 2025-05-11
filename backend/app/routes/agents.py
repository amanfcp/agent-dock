from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, database, auth
from app.agents.github_agent import GitHubAgent
from app.agents.slack_agent import SlackAgent
from app.models import Tool

router = APIRouter(prefix="/agents")
db_dependency = Depends(database.get_db)
auth_dependency = Depends(auth.get_current_user)

@router.post("/register")
def register_agent(agent: schemas.AgentCreate, db: Session = db_dependency, user=auth_dependency):
    new_agent = models.Agent(**agent.dict())
    db.add(new_agent)
    db.commit()
    return {"message": "Agent registered successfully"}

@router.get("/")
def list_agents(db: Session = db_dependency, user=auth_dependency):
    return db.query(models.Agent).all()

@router.post("/invoke")
def invoke_agent(agent_name: str, action: str, message: str = "", db: Session = db_dependency, user=auth_dependency):
    agent = db.query(models.Agent).filter_by(name=agent_name).first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    # Fetch linked tool config
    tool = db.query(Tool).filter_by(name=agent_name).first()
    if not tool:
        raise HTTPException(status_code=404, detail="Tool for agent not found")

    # Execute using real logic
    config = agent.config
    tool_config = tool.config_schema

    if agent_name == "github-agent":
        executor = GitHubAgent(config, tool_config)
        if action == "summarize_prs":
            result = executor.summarize_prs()
        else:
            result = "Invalid action for GitHub Agent."
    elif agent_name == "slack-agent":
        executor = SlackAgent(config, tool_config)
        if action == "send_message":
            result = executor.send_message(message)
        else:
            result = "Invalid action for Slack Agent."
    else:
        result = f"No execution logic defined for agent '{agent_name}'."

    # Log the action
    log_entry = models.Log(
        agent_id=agent.id,
        action=action,
        result=result
    )
    db.add(log_entry)
    db.commit()

    return {"agent": agent_name, "action": action, "result": result}
