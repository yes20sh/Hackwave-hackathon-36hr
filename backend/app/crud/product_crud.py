from app.db.connection import db
from app.schemas.product_schema import ProductCreate
from bson import ObjectId


# ✅ Add new product
async def add_product(product: ProductCreate):
    result = await db.products.insert_one(product.dict())
    product_dict = product.dict()
    product_dict["id"] = str(result.inserted_id)
    return product_dict


# ✅ Get products by category
async def get_products_by_category(category: str):
    products_cursor = db.products.find({"category": category})
    products = []
    async for product in products_cursor:
        product["id"] = str(product["_id"])
        del product["_id"]
        products.append(product)
    return products


# ✅ Get all categories with id + name
async def get_all_categories():
    categories_cursor = db.categories.find({}, {"name": 1})
    categories = []
    async for category in categories_cursor:
        categories.append({
            "id": str(category["_id"]),
            "name": category["name"]
        })
    return categories


# ✅ Delete product by ID
async def delete_product(product_id: str):
    result = await db.products.delete_one({"_id": ObjectId(product_id)})
    if result.deleted_count == 0:
        return {"error": "Product not found"}
    return {"message": "Product deleted successfully"}


# ✅ Add new category (prevents duplicates)
async def add_category(name: str):
    existing = await db.categories.find_one({"name": name})
    if existing:
        return {"error": "Category already exists"}

    result = await db.categories.insert_one({"name": name})
    return {"id": str(result.inserted_id), "name": name}


# ✅ Delete category by ID
async def delete_category(category_id: str):
    result = await db.categories.delete_one({"_id": ObjectId(category_id)})
    if result.deleted_count == 0:
        return {"error": "Category not found"}
    return {"message": "Category deleted successfully"}
