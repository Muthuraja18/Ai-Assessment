from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database.db import Base

class SearchLog(Base):
    __tablename__ = "search_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    query = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)