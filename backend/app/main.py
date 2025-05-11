from fastapi import FastAPI
from app.database import engine
from app import models, auth
from app.routes import agents
from app.routes import tools
from app.routes import logs

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Multi-Agent MCP Server")

app.include_router(auth.router)
app.include_router(agents.router)
app.include_router(tools.router)
app.include_router(logs.router)

@app.get("/")
def root():
    return {"message": "MCP Server is Running"}
