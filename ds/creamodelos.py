from sklearn.linear_model import LogisticRegression
from sklearn.metrics import mean_squared_error, accuracy_score
from sklearn.model_selection import train_test_split
import pickle
import json
import pandas as pd
from keras.models import Sequential
from keras.layers import Dense
from keras.optimizers import Adam
import wandb
from wandb.integration.keras import WandbMetricsLogger #, WandbModelCheckpoint
import os
import numpy as np

def CompareKerasModels(model1, model2, valDataX, valDataY):
    score1 = mean_squared_error(valDataY, model1.predict(pd.DataFrame(valDataX)))
    score2 = mean_squared_error(valDataY, model2.predict(pd.DataFrame(valDataX)))
    return score1, score2

def CompareLogisticModels(model1, model2, valDataX, valDataY):
    score1 = accuracy_score(valDataY, model1.predict(valDataX))
    score2 = accuracy_score(valDataY, model2.predict(valDataX))
    return score1, score2

obs = None
with open('ds/obs.json') as f:
    obs = json.load(f)

res = None
with open('ds/res.json') as f:
    res = json.load(f)

### Obstruction model

api = wandb.Api()
runs = api.runs(path="proydeia/deia")
currRun = 1
model_type = 'obstruction'
architecture = 'dense'
for run in runs:
    if f'{model_type} - {architecture}' in run.name:
        currRun += 1

wandb.init(
    project="deia",
    name=f'{model_type} - {architecture} - {currRun}',

    config={
        "layer_sizes": [64, 32, 16, 1],
        "input_dim": 8,
        "activation_per_layer": ['relu', 'relu', 'relu', 'sigmoid'],
        "epochs": 50,
        "batch_size": 8,
    }
)

wandb_callbacks = [
    WandbMetricsLogger(),
    #WandbModelCheckpoint(filepath="my_model_{epoch:02d}.5"),
]

xObs = []
yObs = []
for k, v in obs.items():
    vals = v.copy()
    del vals['obstruction']
    xObs.append(list(vals.values()))
    yObs.append(v['obstruction'] / 5)

xObsTrain, xObsVal, yObsTrain, yObsVal = train_test_split(xObs, yObs, test_size=0.25, random_state=42)

modelObs = Sequential()
modelObs.add(Dense(64, input_dim=8, activation='relu'))
modelObs.add(Dense(32, activation='relu'))
modelObs.add(Dense(16, activation='relu'))
modelObs.add(Dense(1, activation='sigmoid'))
modelObs.compile(loss='mean_squared_error', optimizer=Adam())
modelObs.fit(pd.DataFrame(xObsTrain), pd.DataFrame(yObsTrain), epochs=50, batch_size=8, validation_data=(pd.DataFrame(xObsVal), pd.DataFrame(yObsVal)), callbacks=wandb_callbacks)
wandb.log({'mean_squared_error': mean_squared_error(yObsVal, modelObs.predict(pd.DataFrame(xObsVal)))})

wandb.finish()

if os.path.exists('ds/modelObs.pkl'):
    with open('ds/modelObs.pkl', 'rb') as f:
        modelObsOld = pickle.load(f)
        score1, score2 = CompareKerasModels(modelObs, modelObsOld, xObsVal, yObsVal)
        print(score1, score2)
        if score1 < score2:
            print('New model is better.')
            with open('ds/modelObs.pkl', 'wb') as j:
                pickle.dump(modelObs, j)
        else:
            print('Old model is better or equal.')
else:
    #print(mean_squared_error(yObsVal, modelObs.predict(xObsVal)))
    with open('ds/modelObs.pkl', 'wb') as j:
        pickle.dump(modelObs, j)
    print('Models created and saved.')

### Restriction model

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