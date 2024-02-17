from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import httpx



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows access from your React app
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

global_count = 0


@app.get("/")
async def read_root():
    return {"Hello": "from FastAPI"}

@app.get("/api/getPokemon/{name}")
async def get_pokemon(name: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://pokeapi.co/api/v2/pokemon/{name.lower()}")
        print(response)
        
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=404, detail=f"Pokemon {name} not found")

@app.put("/api/update/{searchCount}")
async def update_count(searchCount: int):
    global global_count

    global_count = searchCount + 1
    return {"message": "Count update", "newCount": global_count}

@app.get("/api/getCount")
async def get_count():
    global global_count
    response = global_count
    return response