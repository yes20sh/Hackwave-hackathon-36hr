import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file

class Settings:
    # MongoDB Atlas URL
    MONGO_URL: str = os.getenv("MONGO_URL")
    DB_NAME: str = os.getenv("DB_NAME", "fastapi_mongo")
    
    # Optional settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecret")
    SERPAPI_KEY: str = os.getenv("SERPAPI_KEY", "")

settings = Settings()
