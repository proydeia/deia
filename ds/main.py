from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
from sklearn.linear_model import LinearRegression
import pickle
from convert import aivals
import os

app = FastAPI()
model1_path = 'ds/modelObs.pkl'
model2_path = 'ds/modelRes.pkl'

if os.path.exists(model1_path):
    model1 = pickle.load(open(model1_path, 'rb'))
else:
    model1 = None

if os.path.exists(model2_path):
    model2 = pickle.load(open(model2_path, 'rb'))
else:
    model2 = None

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
    #LLN = lin - Comparación con minimo o punto fijo.
    fev1pred: float
    fvc: float
    #LLN = lin - Comparación con minimo o punto fijo.
    fvcpred: float

class SpirometryPlus(Spirometry):
    notasextra: str

@app.post("/obstruction")
async def predictobs(spirometry: Spirometry):
    if spirometry.fev1 / spirometry.fvc < 0.7: return {"result": 0}
    res = spirometry.fev1 / spirometry.fev1pred
    if res < 0.3:
        return {"result": 4} #Muy Severo - GOLD 4
    elif res < 0.5:
        return {"result": 3} #Severo - GOLD 3
    elif res < 0.8:
        return {"result": 2} #Moderado - GOLD 2
    else:
        return {"result": 1} #Leve - GOLD 1
    
@app.post("/obstructionai")
async def predictobsai(spirometry: SpirometryPlus):
    if model1 is None:
        return {"result": -1}
    x = [spirometry.fev1, spirometry.fev1pred, spirometry.fvc, spirometry.fvcpred, *aivals(spirometry.notasextra)]
    res = model1.predict([x])
    return {"result": res[0]}

@app.post("/restriction")
async def predictres(spirometry: Spirometry):
    if spirometry.fev1 / spirometry.fvc < 0.7: return {"result": 0}
    f1res = spirometry.fev1 / spirometry.fvc
    fvctopred = spirometry.fvcpred / spirometry.fev1pred
    if  fvctopred <= 0.8: #and f1res >= 0.75:
        return {"result": 1}
    else:
        return {"result": 0}
    
@app.post("/restrictionai")
async def predictresai(spirometry: SpirometryPlus):
    if model2 is None:
        return {"result": -1}
    x = [spirometry.fev1, spirometry.fev1pred, spirometry.fvc, spirometry.fvcpred, *aivals(spirometry.notasextra)]
    res = model2.predict([x])
    return {"result": res[0]}