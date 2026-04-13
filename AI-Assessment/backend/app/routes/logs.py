from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.activity_log import ActivityLog
from app.utils.dependencies import get_current_user

router = APIRouter(prefix="/logs", tags=["Activity Logs"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔥 GET ALL LOGS (ADMIN ONLY)
@router.get("/")
def get_logs(user=Depends(get_current_user), db: Session = Depends(get_db)):

    if user["role"] != "admin":
        return {"error": "Only admin can view logs"}

    logs = db.query(ActivityLog).order_by(ActivityLog.created_at.desc()).all()

    return [
        {
            "user_id": log.user_id,
            "action": log.action,
            "details": log.details,
            "time": log.created_at
        }
        for log in logs
    ]