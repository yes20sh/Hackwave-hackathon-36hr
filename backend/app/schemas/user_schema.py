from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    name: str
    password: str

class UserLogin(BaseModel):
    username_or_email: str
    password: str

class ForgotPassword(BaseModel):
    email: EmailStr

class ChangePassword(BaseModel):
    username_or_email: str
    new_password: str
