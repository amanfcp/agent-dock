from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, schemas, database, auth
from app.utils import encrypt_api_key
import json


router = APIRouter(prefix="/tools")
db_dependency = Depends(database.get_db)
auth_dependency = Depends(auth.get_current_user)

@router.post("/register")
def register_tool(tool: schemas.ToolCreate, db: Session = db_dependency, user=auth_dependency):
    new_tool = models.Tool(**tool.dict())
    db.add(new_tool)
    db.commit()
    return {"message": "Tool registered successfully."}

@router.get("/")
def list_tools(db: Session = db_dependency, user=auth_dependency):
    return db.query(models.Tool).all()
