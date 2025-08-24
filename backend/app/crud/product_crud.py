from app.db.connection import db
from app.schemas.product_schema import ProductCreate
from bson import ObjectId

async def add_product(product: ProductCreate):
    result = await db.products.insert_one(product.dict())
    product_dict = product.dict()
    product_dict["id"] = str(result.inserted_id)
    return product_dict

async def get_products_by_category(category: str):
    products_cursor = db.products.find({"category": category})
    products = []
    async for product in products_cursor:
        product["id"] = str(product["_id"])
        del product["_id"]
        products.append(product)
    return products
