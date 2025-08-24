from app.db.connection import db
from app.utils.security import hash_password, verify_password

collection = db["users"]

# Create a new user
async def create_user(user_data: dict):
    user_data["password"] = hash_password(user_data["password"])
    await collection.insert_one(user_data)
    return user_data

# Get user by username
async def get_user_by_username(username: str):
    return await collection.find_one({"username": username})

# Get user by email
async def get_user_by_email(email: str):
    return await collection.find_one({"email": email})

# Update user password
async def update_password(email: str, new_password: str):
    hashed = hash_password(new_password)
    await collection.update_one({"email": email}, {"$set": {"password": hashed}})
