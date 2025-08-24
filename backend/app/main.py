from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user_routes, product_routes, search_routes  # Include other routers as needed

app = FastAPI(
    title="FastAPI MongoDB Example",
    description="A FastAPI project with MongoDB, user auth, product management and search API",
    version="1.0.0"
)

# Optional: Add CORS middleware if frontend is separate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to your frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user_routes.router, prefix="/api/users", tags=["Users"])
app.include_router(product_routes.router, prefix="/api/products", tags=["Products"])
app.include_router(search_routes.router, prefix="/api/search", tags=["Search"])

# Root endpoint
@app.get("/", tags=["Root"])
def root():
    return {"message": "FastAPI with MongoDB is running successfully"}
