from fastapi import APIRouter, HTTPException
from app.schemas.user_schema import UserCreate, UserLogin, ForgotPassword
from app.schemas.user_schema import ChangePassword
from app.crud import user_crud
from app.utils.security import verify_password, get_password_hash

router = APIRouter()

# Helper function to serialize MongoDB ObjectId
def serialize_user(user: dict):
    if not user:
        return None
    user["_id"] = str(user["_id"])
    user.pop("password", None)
    return user


@router.post("/signup")
async def signup(user: UserCreate):
    if await user_crud.get_user_by_username(user.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    if await user_crud.get_user_by_email(user.email):
        raise HTTPException(status_code=400, detail="Email already exists")

    created_user = await user_crud.create_user(user.dict())
    created_user = serialize_user(created_user)

    return {
        "success": True,
        "message": "Signup successful",
        "user": created_user
    }


@router.post("/login")
async def login(user: UserLogin):
    # Check if input is email or username
    db_user = await user_crud.get_user_by_username(user.username_or_email)
    if not db_user:
        db_user = await user_crud.get_user_by_email(user.username_or_email)

    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    db_user = serialize_user(db_user)

    return {
        "success": True,
        "message": "Login successful",
        "user": db_user
    }


@router.post("/forgot-password")
async def forgot_password(data: ForgotPassword):
    db_user = await user_crud.get_user_by_email(data.email)
    if not db_user:
        raise HTTPException(status_code=400, detail="Email not found")

    # Reset password for simplicity
    await user_crud.update_password(data.email, "newpassword123")

    return {
        "success": True,
        "message": "Password reset successful. New password is 'newpassword123'"
    }


@router.post("/change-password")
async def change_password(data: ChangePassword):
    # Check if input is email or username
    db_user = await user_crud.get_user_by_username(data.username_or_email)
    if not db_user:
        db_user = await user_crud.get_user_by_email(data.username_or_email)

    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")

    hashed_password = get_password_hash(data.new_password)
    await user_crud.update_password(data.username_or_email, hashed_password)

    return {
        "success": True,
        "message": "Password changed successfully"
    }
