from fastapi import APIRouter
from typing import List
from app.schemas.product_schema import ProductCreate, ProductResponse
from app.crud.product_crud import add_product, get_products_by_category
from app.db.connection import db  # Import MongoDB client for all-products query

router = APIRouter()

# Add product
@router.post("/", response_model=ProductResponse)
async def create_product(product: ProductCreate):
    return await add_product(product)

# List products by category
@router.get("/{category}", response_model=List[ProductResponse])
async def list_products_by_category(category: str):
    return await get_products_by_category(category)

# List all products
@router.get("/", response_model=List[ProductResponse])
async def list_all_products():
    products_cursor = db.products.find({})
    products = []
    async for product in products_cursor:
        product["id"] = str(product["_id"])
        del product["_id"]
        products.append(product)
    return products
