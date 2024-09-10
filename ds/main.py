from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import os
import numpy as np
import pandas as pd
from gli_api import get_fev1_fvc_pred, get_fev1_pred, get_fvc_pred

app = FastAPI()
model1_path = '.\ds\modelObsGold.pkl'
model2_path = '.\ds\modelResGold.pkl'
model3_path = '.\ds\modelObsGLI.pkl'
model4_path = '.\ds\modelObsClassificationGLI.pkl'
model5_path = '.\ds\modelResGLI.pkl'
model1 = None
model2 = None
model3 = None
model4 = None
model5 = None

if os.path.exists(model1_path):
    model1 = pickle.load(open(model1_path, 'rb'))

if os.path.exists(model2_path):
    model2 = pickle.load(open(model2_path, 'rb'))

if os.path.exists(model3_path):
    model1 = pickle.load(open(model3_path, 'rb'))

if os.path.exists(model4_path):
    model2 = pickle.load(open(model4_path, 'rb'))

if os.path.exists(model5_path):
    model2 = pickle.load(open(model5_path, 'rb'))

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

@app.post("/obstructiongold")
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
        z = (-(np.abs(predictionsFEV1["LLN"] - spirometry.fev1)) / predictionsFEV1["S"])

        if z > -1.645: return {"result": 1} #Normal
        elif z > -2.5: return {"result": 2} #Mild
        elif z > -4: return {"result": 3} #Moderate
        else: return {"result": 4} #Severe
    return {"result": 0} #Nada
    
@app.post("/obstructionaigold")
async def predictobsai(spirometry: SpirometryPlus):
    if model1 is None:
        return {"result": -1}
    x = np.array([[spirometry.fev1, spirometry.fev1pred, spirometry.fvc, spirometry.fvcpred, spirometry.edad, spirometry.sexo, spirometry.altura, spirometry.peso]])
    #x = pd.DataFrame(x)
    res = model1.predict(x) * 4
    print(res)
    return {"result": str(res[0][0])}

@app.post("/obstructionaigli")
async def predictobsai(spirometry: SpirometryPlus):
    if model3 is None:
        return {"result": -1}
    x = np.array([[spirometry.fev1, spirometry.fev1pred, spirometry.fvc, spirometry.fvcpred, spirometry.edad, spirometry.sexo, spirometry.altura]])
    #x = pd.DataFrame(x)
    res = model1.predict(x) * 4
    print(res)
    return {"result": str(res[0][0])}

@app.post("/obstructionaiglicategorical")
async def predictobsai(spirometry: SpirometryPlus):
    if model4 is None:
        return {"result1": -1, "result2": -1}
    x = np.array([[spirometry.fev1, spirometry.fev1pred, spirometry.fvc, spirometry.fvcpred, spirometry.edad, spirometry.sexo, spirometry.altura]])
    res = model4.predict(x)
    sorted_indices = np.argsort(res[0])[::-1]
    top1 = sorted_indices[0]
    top2 = sorted_indices[1]
    print(res)
    return {"result1": str(top1), "result2": str(top2)}

@app.post("/restrictiongold")
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
    
    return {"result": 0}
    
@app.post("/restrictionaigold")
async def predictresai(spirometry: SpirometryPlus):
    if model5 is None:
        return {"result": -1}
    x = np.array([spirometry.fev1, spirometry.fev1pred, spirometry.fvc, spirometry.fvcpred, spirometry.edad, spirometry.sexo, spirometry.altura])
    res = model5.predict([x])
    return {"result": str(res[0][0])}