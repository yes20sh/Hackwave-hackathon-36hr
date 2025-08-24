from fastapi import APIRouter
from app.schemas.search_schema import SearchRequest
from app.services.search_service import search_google_shopping

router = APIRouter(prefix="/search", tags=["Search"])

@router.post("/")
def search_products(request: SearchRequest):
    # Only pass the query now
    results = search_google_shopping(request.query)
    return results
