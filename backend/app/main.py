from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user_routes, product_routes, search_routes, image_routes  # Added image_routes

app = FastAPI(
    title="FastAPI MongoDB Example",
    description="A FastAPI project with MongoDB, user auth, product management, search API and image analysis",
    version="1.1.0"
)

# Optional: Add CORS middleware if frontend is separate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict to frontend domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user_routes.router, prefix="/api/users", tags=["Users"])
app.include_router(product_routes.router, prefix="/api/products", tags=["Products"])
app.include_router(search_routes.router, prefix="/api/search", tags=["Search"])
app.include_router(image_routes.router, prefix="/api/images", tags=["Images"])  # New image route

# Root endpoint
@app.get("/", tags=["Root"])
def root():
    return {"message": "FastAPI with MongoDB is running successfully"}
