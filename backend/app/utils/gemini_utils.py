import os
from google import genai
from google.genai import types

# ✅ Load API key from environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# ✅ Initialize Gemini client safely
gemini_client = None
if GEMINI_API_KEY:
    try:
        gemini_client = genai.Client(api_key=GEMINI_API_KEY)
    except Exception as e:
        print(f"[Gemini Init Error] Failed to initialize client: {e}")
else:
    print("[Gemini Warning] GEMINI_API_KEY not found in environment variables")


def analyze_image(image_bytes: bytes) -> dict:
    """
    Sends image to Gemini API and returns a generated prompt + categories.
    """
    if not gemini_client:
        return {"prompt": None, "categories": [], "error": "Gemini client not initialized. Missing API key."}

    try:
        response = gemini_client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[
                types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"),
                "Please describe the clothing item in the image and suggest a concise shopping prompt."
            ]
        )
        text = response.text or ""

        # Extract prompt
        prompt = text.strip()
        if "Prompt:" in text:
            prompt = text.split("Prompt:")[1].split("\n")[0].strip()

        # Extract categories
        categories = []
        if "Categories:" in text:
            cats = text.split("Categories:")[1].split("\n")[0]
            categories = [cat.strip() for cat in cats.split(",") if cat.strip()]

        return {"prompt": prompt, "categories": categories}

    except Exception as e:
        return {"prompt": None, "categories": [], "error": str(e)}
