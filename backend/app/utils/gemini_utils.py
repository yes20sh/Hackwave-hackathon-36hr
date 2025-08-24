import os
from google import genai
from google.genai import types
from app.core.config import settings

# Initialize Gemini client
gemini_client = genai.Client(api_key=settings.GEMINI_API_KEY)

def analyze_image(image_bytes: bytes) -> dict:
    """
    Sends image to Gemini API and returns a generated prompt + categories.
    """
    try:
        response = gemini_client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[
                types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"),
                "Please describe the clothing item in the image and suggest a concise shopping prompt."
            ]
        )
        text = response.text or ""
        # Here we assume prompt and categories follow "Prompt:" and "Categories:" lines
        prompt = text.split("Prompt:")[1].split("\n")[0].strip() if "Prompt:" in text else text.strip()
        categories = []
        if "Categories:" in text:
            cats = text.split("Categories:")[1].split("\n")[0]
            categories = [cat.strip() for cat in cats.split(",") if cat.strip()]
        return {"prompt": prompt, "categories": categories}
    except Exception as e:
        return {"prompt": None, "categories": [], "error": str(e)}
