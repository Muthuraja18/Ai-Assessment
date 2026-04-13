from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserCreate, UserUpdate, UserLogin
from app.database.db import SessionLocal
from app.models.user import User
from app.utils.jwt_handler import create_token
from app.utils.dependencies import get_current_user   # ✅ ADD THIS
from passlib.hash import bcrypt
from app.utils.activity_logger import log_activity

router = APIRouter(prefix="/auth")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    hashed_pw = bcrypt.hash(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_pw,
        role=user.role
    )

    db.add(new_user)
    db.commit()

    return {"message": "User created"}

@router.put("/profile")
def update_profile(data: UserUpdate, user=Depends(get_current_user), db: Session = Depends(get_db)):
    
    db_user = db.query(User).filter(User.id == user["user_id"]).first()

    db_user.name = data.name
    db_user.phone = data.phone

    db.commit()

    return {"message": "Profile updated"}

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or not bcrypt.verify(user.password, db_user.password):
        return {"error": "Invalid credentials"}

    # ✅ CREATE TOKEN
    token = create_token({
        "user_id": db_user.id,
        "role": db_user.role
    })

    # ✅ 🔥 LOG ACTIVITY (VERY IMPORTANT)
    log_activity(
        db,
        db_user.id,
        "LOGIN",
        f"{db_user.email} logged in"
    )

    return {
        "access_token": token,
        "role": db_user.role,
        "username": db_user.name,
        "user_id": db_user.id
    }