from pydantic import BaseModel
from typing import List, Optional

class Product(BaseModel):
    category: str
    position: int
    title: str
    product_link: str
    product_id: str
    serpapi_product_api: str
    immersive_product_page_token: str
    serpapi_immersive_product_api: str
    source: str
    source_icon: str
    multiple_sources: bool
    price: str
    extracted_price: float
    old_price: Optional[str]
    extracted_old_price: Optional[float]
    rating: Optional[float]
    reviews: Optional[int]
    thumbnail: str
    thumbnails: List[str]
    serpapi_thumbnails: List[str]
