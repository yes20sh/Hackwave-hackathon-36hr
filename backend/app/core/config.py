import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file

class Settings:
    # MongoDB Atlas URL
    MONGO_URL: str = os.getenv("MONGO_URL")
    DB_NAME: str = os.getenv("DB_NAME", "fastapi_mongo")
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecret")
    
    # APIs
    SERPAPI_KEY: str = os.getenv("SERPAPI_KEY", "")
    HUGGINGFACE_API_KEY: str = os.getenv("HUGGINGFACE_API_KEY", "")

settings = Settings()
