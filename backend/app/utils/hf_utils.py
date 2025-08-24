import base64
import requests
from app.core.config import settings

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
            raise Exception(f"HF API error {response.status_code}: {response.text}")

        result = response.json()
        if "generated_image" in result:
            return base64.b64decode(result["generated_image"])
        else:
            return response.content

    except Exception as e:
        print("HF try-on error:", e)
        raise
