from fastapi import APIRouter
from typing import List
from app.schemas.product_schema import ProductCreate, ProductResponse
from app.crud.product_crud import (
    add_product,
    get_products_by_category,
    get_all_category_names,
    add_category,
    delete_category,
)
from app.db.connection import db  # MongoDB client

router = APIRouter()

# -------------------- Products --------------------

# ✅ Add product
@router.post("/", response_model=ProductResponse)
async def create_product(product: ProductCreate):
    return await add_product(product)

# ✅ Add product into specific category
@router.post("/category/{category}", response_model=ProductResponse)
async def create_product_in_category(category: str, product: ProductCreate):
    """
    Create a new product and directly assign it to a specific category.
    """
    product.category = category  # force assign category
    return await add_product(product)

# ✅ List products by category
@router.get("/category/{category}", response_model=List[ProductResponse])
async def list_products_by_category(category: str):
    return await get_products_by_category(category)

# ✅ List all products
@router.get("/", response_model=List[ProductResponse])
async def list_all_products():
    products_cursor = db.products.find({})
    products = []
    async for product in products_cursor:
        product["id"] = str(product["_id"])
        del product["_id"]
        products.append(product)
    return products

# -------------------- Categories --------------------

# ✅ Get all category names
@router.get("/categories", response_model=List[str])
async def list_all_categories():
    return await get_all_category_names()

# ✅ Add new category
@router.post("/categories")
async def create_category(name: str):
    return await add_category(name)

# ✅ Delete category by ID
@router.delete("/categories/{category_id}")
async def remove_category(category_id: str):
    return await delete_category(category_id)
