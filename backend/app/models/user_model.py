from pydantic import BaseModel, EmailStr
from typing import Optional

class User(BaseModel):
    username: str
    email: EmailStr
    name: str
    password: str
