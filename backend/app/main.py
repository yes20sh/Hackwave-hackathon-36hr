from fastapi import FastAPI
from app.routes import search_routes

app = FastAPI(title="FastAPI with SerpApi")

# include routers
app.include_router(search_routes.router)

@app.get("/")
def root():
    return {"message": "Welcome to FastAPI + SerpApi example"}
