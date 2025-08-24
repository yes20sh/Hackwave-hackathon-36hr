import logging
from google import genai
from google.genai import types
import os

# Load API key from environment and initialize Gemini client
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
gemini_client = None
if GEMINI_API_KEY:
    try:
        gemini_client = genai.Client(api_key=GEMINI_API_KEY)
    except Exception as e:
        logging.error(f"Failed to initialize Gemini client: {e}")
else:
    logging.warning("GEMINI_API_KEY not found in environment variables")


def analyze_image(image_bytes: bytes) -> dict:
    """
    Sends an image to Gemini API and extracts a shopping prompt and categories.

    Returns a dict with keys:
    - prompt: a concise shopping prompt describing the clothing item
    - categories: a list of category strings
    - error: error message if applicable
    """

    if not gemini_client:
        return {"prompt": None, "categories": [], "error": "Gemini client not initialized. Missing API key."}

    try:
        instruction = (
            "Analyze the clothing item in this image. all upper and lower and accessories"
            "Provide a concise shopping prompt starting with 'Prompt:' on a new line, "
            "and list relevant categories starting with 'Categories:' on another new line, comma-separated."
        )

        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"),
                instruction
            ]
        )

        raw_text = response.text or ""
        logging.debug(f"Gemini raw response:\n{raw_text}")

        # Parse prompt
        prompt = None
        if "Prompt:" in raw_text:
            prompt_line = raw_text.split("Prompt:")[1].split("\n")[0].strip()
            if prompt_line:
                prompt = prompt_line

        # Parse categories
        categories = []
        if "Categories:" in raw_text:
            cats_line = raw_text.split("Categories:")[1].split("\n")[0]
            categories = [c.strip() for c in cats_line.split(",") if c.strip()]

        if not prompt:
            return {"prompt": None, "categories": categories, "error": "Failed to extract prompt from Gemini response."}

        return {"prompt": prompt, "categories": categories}

    except Exception as e:
        logging.error(f"Error during Gemini image analysis: {e}", exc_info=True)
        return {"prompt": None, "categories": [], "error": str(e)}
