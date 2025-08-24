from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import (
    user_routes,
    product_routes,
    search_routes,
    image_routes,   # Image analysis
    tryon_routes    # Hugging Face try-on route
)

app = FastAPI(
    title="FastAPI Fashion API",
    description="A FastAPI project with MongoDB, user auth, product management, search API, image analysis, and AI try-on",
    version="1.2.0"
)

# Add CORS middleware (allow all origins for development)
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
app.include_router(image_routes.router, prefix="/api/images", tags=["Images"])
app.include_router(tryon_routes.router, prefix="/api/tryon", tags=["Try-On"])  # Hugging Face try-on

# Root endpoint
@app.get("/", tags=["Root"])
def root():
    return {"message": "FastAPI with MongoDB and AI Try-On is running successfully"}
