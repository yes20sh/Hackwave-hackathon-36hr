from fastapi import APIRouter, UploadFile, File, HTTPException
from app.utils.gemini_utils import analyze_image
from app.utils.serpapi_utils import search_google_shopping

router = APIRouter()

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()

        analysis = analyze_image(image_bytes)
        prompt = analysis.get("prompt")
        categories = analysis.get("categories", [])

        if not prompt:
            error = analysis.get("error", "Failed to generate prompt from image.")
            raise HTTPException(status_code=400, detail=error)

        search = search_google_shopping(prompt)
        if search.get("status") == "error":
            return {
                "prompt": prompt,
                "categories": categories,
                "search_results": [],
                "serpapi_message": search.get("message", "SerpAPI error")
            }

        return {
            "prompt": prompt,
            "categories": categories,
            "search_results": search.get("shopping_results", [])
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
