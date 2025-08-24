# app/routes/shopping_routes.py
from fastapi import APIRouter, Query
from serpapi import GoogleSearch
import os

router = APIRouter(prefix="/shopping", tags=["Shopping"])

# Ideally, keep API key in .env instead of hardcoding
SERPAPI_KEY = os.getenv("SERPAPI_KEY", "your_api_key_here")

@router.get("/")
def search_shopping(q: str = Query(..., description="Search term"),
                    location: str = "Austin, Texas, United States"):
    params = {
        "engine": "google_shopping",
        "q": q,
        "location": location,
        "google_domain": "google.com",
        "hl": "en",
        "gl": "us",
        "api_key": SERPAPI_KEY,
    }

    search = GoogleSearch(params)
    results = search.get_dict()
    
    # Extract just shopping results if present
    return {
        "query": q,
        "location": location,
        "shopping_results": results.get("shopping_results", []),
    }
