from app.db.connection import db
from app.models.clothing_model import ClothingItem

async def search_clothing_by_style(style_tags: List[str]) -> List[ClothingItem]:
    # Search for clothing items matching the style tags
    query = {"style_tags": {"$in": style_tags}}
    cursor = db.clothing_items.find(query)
    return [ClothingItem(**item) async for item in cursor]
