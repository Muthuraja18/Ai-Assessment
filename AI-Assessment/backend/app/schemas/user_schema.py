from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str

class UserLogin(BaseModel):   # ✅ ADD THIS
    email: str
    password: str
class UserUpdate(BaseModel):
    name: str
    phone: str