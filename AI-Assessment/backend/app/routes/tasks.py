from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.task import Task
from app.schemas.task_schema import TaskCreate
from app.utils.dependencies import get_current_user
from app.utils.activity_logger import log_activity   # ✅ ADD

router = APIRouter(prefix="/tasks", tags=["Tasks"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔴 CREATE TASK (ADMIN ONLY)
@router.post("/")
def create_task(
    task: TaskCreate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    new_task = Task(
        title=task.title,
        description=task.description,
        assigned_to=task.assigned_to,
        status="pending"
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    # ✅ 🔥 LOG ACTIVITY
    log_activity(
        db,
        user["user_id"],
        "TASK_CREATE",
        f"Task {new_task.id} assigned to user {task.assigned_to}"
    )

    return {
        "message": "Task created successfully",
        "task_id": new_task.id
    }


# 🟢 GET TASKS (WITH FILTERING 🔥)
@router.get("/")
def get_tasks(
    status: str = None,
    assigned_to: int = None,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    query = db.query(Task)

    # 🔐 ROLE BASED
    if user["role"] != "admin":
        query = query.filter(Task.assigned_to == user["user_id"])

    # 🔥 FILTERING (MANDATORY REQUIREMENT)
    if status:
        query = query.filter(Task.status == status)

    if assigned_to and user["role"] == "admin":
        query = query.filter(Task.assigned_to == assigned_to)

    return query.all()


# 🔥 SUBMIT TASK (USER)
@router.put("/{task_id}/submit")
def submit_task(
    task_id: int,
    payload: dict,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.assigned_to != user["user_id"]:
        raise HTTPException(status_code=403, detail="Not your task")

    task.answer_text = payload.get("answer_text")
    task.status = "completed"

    db.commit()

    # ✅ 🔥 LOG ACTIVITY (VERY IMPORTANT)
    log_activity(
        db,
        user["user_id"],
        "TASK_UPDATE",
        f"Task {task.id} marked as completed"
    )

    return {"message": "Task submitted successfully"}