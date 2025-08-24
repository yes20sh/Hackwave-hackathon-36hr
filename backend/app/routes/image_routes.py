from fastapi import APIRouter, UploadFile, File, HTTPException
from app.utils.gemini_utils import analyze_image
import os

# Optional: import SerpAPI if available
try:
    from app.utils.serpapi_utils import search_google_shopping
    SERPAPI_ENABLED = True
except ImportError:
    SERPAPI_ENABLED = False

router = APIRouter()

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()

        # Analyze image with Gemini
        analysis = analyze_image(image_bytes)
        prompt = analysis.get("prompt")
        categories = analysis.get("categories", [])

        if not prompt:
            error = analysis.get("error", "Failed to generate prompt from image.")
            raise HTTPException(status_code=400, detail=error)

        # If SerpAPI is not configured, return only prompt & categories
        if not SERPAPI_ENABLED:
            return {
                "prompt": prompt,
                "categories": categories,
                "search_results": [],
                "serpapi_message": "SerpAPI not configured"
            }

        # If SerpAPI available, try searching
        search = search_google_shopping(prompt)
        if isinstance(search, dict) and search.get("error"):
            return {
                "prompt": prompt,
                "categories": categories,
                "search_results": [],
                "serpapi_message": search["error"]
            }

        return {
            "prompt": prompt,
            "categories": categories,
            "search_results": search  
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
