from sklearn.linear_model import LogisticRegression
from sklearn.metrics import mean_squared_error, accuracy_score
from sklearn.model_selection import train_test_split
import pickle
import json
import pandas as pd
from keras.src.models import Sequential
from keras.src.layers import Dense
from keras.src.optimizers import Adam
import wandb
from wandb.integration.keras import WandbMetricsLogger #, WandbModelCheckpoint
import os
import numpy as np

def CompareLogisticModels(model1, model2, valDataX, valDataY):
    score1 = accuracy_score(valDataY, model1.predict(valDataX))
    score2 = accuracy_score(valDataY, model2.predict(valDataX))
    return score1, score2

res = None
with open('ds/res.json') as f:
    res = json.load(f)

### Restriction model

api = wandb.Api()
runs = api.runs(path="proydeia/deia")
currRun = 1
model_type = 'restriction'
architecture = 'logistic'
for run in runs:
    if f'{model_type} - {architecture}' in run.name:
        currRun += 1

wandb.init(
    project="deia",
    name=f'{model_type} - {architecture} - {currRun}',
)

wandb_callbacks = [
    WandbMetricsLogger(),
    #WandbModelCheckpoint(filepath="my_model_{epoch:02d}.5"),
]

xRes = []
yRes = []
for k, v in res.items():
    vals = v.copy()
    del vals['restriction']
    xRes.append(list(vals.values()))
    yRes.append(v['restriction'])

xResTrain, xResval, yResTrain, yResval = train_test_split(xRes, yRes, test_size=0.25, random_state=23)

modelRes = LogisticRegression(class_weight="balanced")
modelRes.fit(np.array(xResTrain), np.array(yResTrain))
wandb.log({'accuracy': accuracy_score(yResval, modelRes.predict(xResval)), "valPredAttempt": list(modelRes.predict(xResval)), "valTrue": yResval})

wandb.finish()

if os.path.exists('ds/modelRes.pkl'):
    with open('ds/modelRes.pkl', 'rb') as f:
        modelResOld = pickle.load(f)
        score1, score2 = CompareLogisticModels(modelRes, modelResOld, xResval, yResval)
        print(score1, score2)
        if score1 > score2:
            modelRes = modelResOld
            with open('ds/modelRes.pkl', 'wb') as j:
                pickle.dump(modelRes, j)
        else:
            print('Old model is better or equal.')
else:
    with open('ds/modelRes.pkl', 'wb') as j:
        pickle.dump(modelRes, j)
    print('Models created and saved.')