from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

#Make a post request to the server. It should take two numbers as input and return their sum.
class Numbers(BaseModel):
    a: int
    b: int

@app.post("/add")
async def add(numbers: Numbers):
    return {"sum": numbers.a + numbers.b}

class Spirometry(BaseModel):
    fev1: float
    fev1pred: float
    fvc: float
    fvcpred: float

@app.post("/obstruction")
async def predict(spirometry: Spirometry):
    res = spirometry.fev1 / spirometry.fev1pred
    if res < 0.3:
        return {"result": 4} #Muy Severo - GOLD 4
    elif res < 0.5:
        return {"result": 3} #Severo - GOLD 3
    elif res < 0.8:
        return {"result": 2} #Moderado - GOLD 2
    else:
        return {"result": 1} #Leve - GOLD 1

@app.post("/restriction")
async def predict(spirometry: Spirometry):
    f1res = spirometry.fev1 / spirometry.fvc
    fvctopred = spirometry.fvcpred / spirometry.fev1pred
    if f1res >= 0.75 and fvctopred <= 0.75:
        return {"result": 1}
    else:
        return {"result": 0}