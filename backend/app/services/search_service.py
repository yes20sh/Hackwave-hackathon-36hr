from serpapi import GoogleSearch
from app.core.config import settings

def search_google_shopping(query: str, location: str = "Austin, Texas, United States"):
    try:
        params = {
            "engine": "google_shopping",
            "q": query,
            "location": location,
            "google_domain": "google.com",
            "hl": "en",
            "gl": "us",
            "api_key": settings.SERPAPI_KEY
        }

        search = GoogleSearch(params)
        results = search.get_dict()

        if "error" in results:
            return {"status": "error", "message": results["error"]}

        return {"status": "success", "data": results}

    except Exception as e:
        return {"status": "error", "message": str(e)}
