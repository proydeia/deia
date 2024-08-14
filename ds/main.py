from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import os
import numpy as np
import pandas as pd
from gli_api import get_fev1_fvc_pred, get_fev1_pred, get_fvc_pred

app = FastAPI()
model1_path = 'ds\modelObs.pkl'
model2_path = 'ds\modelRes.pkl'
model1 = None
model2 = None

if os.path.exists(model1_path):
    model1 = pickle.load(open(model1_path, 'rb'))

if os.path.exists(model2_path):
    model2 = pickle.load(open(model2_path, 'rb'))

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
    fvc: float

class SpirometryLLN(Spirometry):
    #LLN = lin - Comparación con minimo o punto fijo.
    fev1pred: float
    #LLN = lin - Comparación con minimo o punto fijo.
    fvcpred: float

class SpirometryPlus(SpirometryLLN):
    #Edad (podes tener 15.63 años por ejemplo)
    edad: float
    #0F 1M
    sexo: int
    altura: float
    peso: float

@app.post("/obstruction")
async def predictobs(spirometry: SpirometryLLN):
    if spirometry.fev1 / spirometry.fvc >= 0.7: return {"result": 0}
    res = spirometry.fev1 / spirometry.fev1pred
    if res < 0.3:
        return {"result": 4} #Muy Severo - GOLD 4
    elif res < 0.5:
        return {"result": 3} #Severo - GOLD 3
    elif res < 0.8:
        return {"result": 2} #Moderado - GOLD 2
    else:
        return {"result": 1} #Leve - GOLD 1
    
@app.post("/obstructiongli")
async def predictobsGLI(spirometry: SpirometryPlus):
    predictionsFEV1 = get_fev1_pred(spirometry.sexo, spirometry.edad, spirometry.altura)
    predictionsFraction = get_fev1_fvc_pred(spirometry.sexo, spirometry.edad, spirometry.altura)

    if spirometry.fev1 / spirometry.fvc < predictionsFraction["LLN"]:
        z = ((predictionsFEV1["LLN"] - spirometry.fev1) / predictionsFEV1["S"])

        if z > -2.5: return {"result": 1}
        elif z > -4: return {"result": 2}
        else: return {"result": 3} 

    
@app.post("/obstructionai")
async def predictobsai(spirometry: SpirometryPlus):
    if model1 is None:
        return {"result": -1}
    x = np.array([[spirometry.fev1, spirometry.fev1pred, spirometry.fvc, spirometry.fvcpred, spirometry.edad, spirometry.sexo, spirometry.altura, spirometry.peso]])
    #x = pd.DataFrame(x)
    res = model1.predict(x) * 5
    print(res)
    return {"result": str(res[0][0])}

@app.post("/restriction")
async def predictres(spirometry: SpirometryLLN):
    f1res = spirometry.fev1 / spirometry.fvc
    if f1res < 0.7: return {"result": 0}
    fvctopred = spirometry.fvc / spirometry.fvcpred
    if  fvctopred <= 0.8:
        return {"result": 1}
    else:
        return {"result": 0}
    
@app.post("/restrictiongli")
async def predictresgli(spirometry: SpirometryPlus):
    predictionsFVC = get_fvc_pred(spirometry.sexo, spirometry.edad, spirometry.altura)
    predictionsFraction = get_fev1_fvc_pred(spirometry.sexo, spirometry.edad, spirometry.altura)

    if spirometry.fev1 / spirometry.fvc >= predictionsFraction["LLN"]:
        if spirometry.fvc < predictionsFVC["LLN"]: return {"result": 1}
        else: return {"result": 0}
    
@app.post("/restrictionai")
async def predictresai(spirometry: SpirometryPlus):
    if model2 is None:
        return {"result": -1}
    x = np.array([spirometry.fev1, spirometry.fev1pred, spirometry.fvc, spirometry.fvcpred, spirometry.edad, spirometry.sexo, spirometry.altura, spirometry.peso])
    res = model2.predict([x])
    return {"result": str(res[0][0])}