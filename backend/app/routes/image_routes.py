from fastapi import APIRouter, UploadFile, File, HTTPException
import logging
import traceback
from serpapi import GoogleSearch
import os

router = APIRouter()

# Load SerpAPI API key from environment variable, replace with your key if needed
SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY", "16c52fb7ba46bbd907f2d522a8815963ea6d630f017fb535a040f6e3a80f04c1")

# Assume analyze_image is imported from your gemini_utils
from app.utils.gemini_utils import analyze_image

def search_google_shopping(query):
    if not SERPAPI_API_KEY:
        return {"error": "SerpAPI API key not configured"}

    params = {
        "engine": "google_shopping",
        "q": query,
        "location": "India",
        "google_domain": "google.com",
        "hl": "en",
        "gl": "in",
        "api_key": SERPAPI_API_KEY,
    }

    try:
        search = GoogleSearch(params)
        results = search.get_dict()
        shopping_results = results.get("shopping_results", [])
        return shopping_results
    except Exception as e:
        return {"error": str(e)}


@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Read uploaded image bytes
        image_bytes = await file.read()

        # Analyze image → get prompt and categories
        analysis = analyze_image(image_bytes)
        logging.debug(f"Image analysis output: {analysis}")

        prompt = analysis.get("prompt")
        categories = analysis.get("categories", [])

        if not prompt or not isinstance(prompt, str) or prompt.strip() == "":
            error_msg = analysis.get("error", "Failed to generate prompt from image.")
            raise HTTPException(status_code=400, detail=error_msg)

        result = {
            "prompt": prompt,
            "categories": categories,
            "search_results": [],
            "serpapi_message": None
        }

        # Query SerpAPI Google Shopping
        if SERPAPI_API_KEY:
            try:
                if not prompt.strip():
                    result["serpapi_message"] = "Empty prompt for search."
                else:
                    logging.debug(f"Searching shopping with prompt: {prompt}")
                    search = search_google_shopping(prompt)
                    logging.debug(f"SerpAPI search raw result: {search}")

                    if isinstance(search, dict) and search.get("error"):
                        result["serpapi_message"] = f"SerpAPI error: {search['error']}"
                    elif isinstance(search, list) and len(search) > 0:
                        result["search_results"] = search
                    else:
                        result["serpapi_message"] = "No shopping results found."
            except Exception as e:
                result["serpapi_message"] = f"SerpAPI exception: {str(e)}"
                logging.error("SerpAPI call failed", exc_info=True)
        else:
            result["serpapi_message"] = "SerpAPI API key not configured"

        return result

    except HTTPException:
        raise
    except Exception as e:
        logging.error("Upload API error", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
