import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    SERPAPI_KEY: str = os.getenv("SERPAPI_KEY", "")

settings = Settings()
