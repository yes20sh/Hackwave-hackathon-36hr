from fastapi import FastAPI
from app.routes import user_routes

app = FastAPI(title="FastAPI MongoDB Auth Example")

app.include_router(user_routes.router, prefix="/api/users", tags=["Users"])

@app.get("/")
def root():
    return {"message": "FastAPI with MongoDB"}
