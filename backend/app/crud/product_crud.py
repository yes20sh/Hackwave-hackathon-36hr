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


# ✅ Get only all category names
async def get_all_category_names():
    categories_cursor = db.categories.find({}, {"name": 1, "_id": 0})
    category_names = []
    async for category in categories_cursor:
        category_names.append(category["name"])
    return category_names


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
