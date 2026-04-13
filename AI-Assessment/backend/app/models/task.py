from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.base import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(100), nullable=False)
    description = Column(String(255), nullable=False)

    status = Column(String(50), default="pending")  # pending / completed

    assigned_to = Column(Integer, ForeignKey("users.id"))  # 🔥 proper relation

    answer_text = Column(String(1000), nullable=True)  # 🔥 USER SUBMISSION