from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, database, auth

router = APIRouter(prefix="/logs")
db_dependency = Depends(database.get_db)
auth_dependency = Depends(auth.get_current_user)

@router.get("/")
def get_logs(db: Session = db_dependency, user=auth_dependency):
    return db.query(models.Log).order_by(models.Log.timestamp.desc()).all()