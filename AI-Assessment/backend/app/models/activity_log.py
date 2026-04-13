from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database.db import Base

class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    action = Column(String)
    details = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)