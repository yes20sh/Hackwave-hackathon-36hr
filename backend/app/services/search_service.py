from serpapi import GoogleSearch
from app.core.config import settings

def search_google_shopping(query: str):
    try:
        params = {
            "engine": "google_shopping",
            "q": query,
            "location": "India",
            "google_domain": "google.com",
            "hl": "en",
            "gl": "in",
            "api_key": settings.SERPAPI_KEY,
            # Optional: "num": 20,  # Number of products to fetch
        }

        search = GoogleSearch(params)
        results = search.get_dict()

        if "error" in results:
            return {"status": "error", "message": results["error"]}

        # Extract just the shopping_results array and return
        shopping_results = results.get("shopping_results", [])

        # You can also filter/transform here if needed before sending
        return {
            "status": "success",
            "shopping_results": shopping_results,
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}
