from fastapi import FastAPI
import pokebase as pb
from fastapi.middleware.cors import CORSMiddleware
import sys




app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows access from your React app
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def read_root():
    return {"Hello": "from FastAPI"}

@app.get("/pokemon/{name}")
async def get_pokemon(name: str):
    try: 
        pokemon = pb.pokemon(name.lower())
        print(pokemon)
        return {'data': pokemon}
    except Exception as e:
        return {'error': str(e)}

