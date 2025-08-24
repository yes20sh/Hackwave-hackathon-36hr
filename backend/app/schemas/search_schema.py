from pydantic import BaseModel

class SearchRequest(BaseModel):
    query: str
    location: str | None = "Austin, Texas, United States"
