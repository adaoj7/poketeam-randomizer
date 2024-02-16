from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "from FastAPI"}

@app.get("/getPokemon")
async def read_root():
    return 