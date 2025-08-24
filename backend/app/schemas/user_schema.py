from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    name: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class ForgotPassword(BaseModel):
    email: EmailStr
