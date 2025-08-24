import base64
import requests
from app.core.config import settings
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
import io

MODEL_API_URL = "https://api-inference.huggingface.co/models/HumanAIGC/OutfitAnyone"
HEADERS = {"Authorization": f"Bearer {settings.HUGGINGFACE_API_KEY}"}

def apply_outfit_to_image(user_bytes: bytes, outfit_bytes: bytes) -> bytes:
    try:
        user_b64 = base64.b64encode(user_bytes).decode("utf-8")
        outfit_b64 = base64.b64encode(outfit_bytes).decode("utf-8")

        payload = {
            "inputs": {
                "user_image": user_b64,
                "outfit_image": outfit_b64
            }
        }

        response = requests.post(MODEL_API_URL, headers=HEADERS, json=payload)

        if response.status_code != 200:
            # Capture and log detailed info from response if available
            try:
                error_info = response.json()
            except Exception:
                error_info = response.text
            raise Exception(f"HF API error {response.status_code}: {error_info}")

        result = response.json()
        if "generated_image" in result:
            return base64.b64decode(result["generated_image"])
        else:
            # If no generated_image key, return raw content (fallback)
            return response.content

    except Exception as e:
        print("HF try-on error:", e)
        raise


router = APIRouter()

@router.post("/tryon")
async def tryon(user_image: UploadFile = File(...), outfit_image: UploadFile = File(...)):
    try:
        # Read uploaded files
        user_bytes = await user_image.read()
        outfit_bytes = await outfit_image.read()

        # Call Hugging Face utility
        try:
            generated_bytes = apply_outfit_to_image(user_bytes, outfit_bytes)
        except Exception as hf_err:
            # Log HF errors and propagate as HTTPException with details
            raise HTTPException(status_code=500, detail=f"Hugging Face API error: {hf_err}")

        # Return image as streaming response
        return StreamingResponse(io.BytesIO(generated_bytes), media_type="image/png")

    except HTTPException:
        # Already handled HF errors
        raise
    except Exception as e:
        # Catch all other exceptions
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
