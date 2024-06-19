from sklearn.linear_model import LogisticRegression
from sklearn.metrics import mean_squared_error, accuracy_score
import pickle
import json
import pandas as pd
from keras.models import Sequential
from keras.layers import Dense
from keras.optimizers import Adam
import os

def CompareKerasModels(model1, model2, valDataX, valDataY):
    score1 = mean_squared_error(valDataY, model1.predict(valDataX))
    score2 = mean_squared_error(valDataY, model2.predict(valDataX))
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

xObs = []
yObs = []
for k, v in obs.items():
    vals = v.copy()
    del vals['obstruction']
    xObs.append(list(vals.values()))
    yObs.append(v['obstruction'] / 5)

xObsTrain = xObs[:int(0.8 * len(xObs))]
yObsTrain = yObs[:int(0.8 * len(yObs))]
xObsVal = xObs[int(0.8 * len(xObs)):]
yObsVal = yObs[int(0.8 * len(yObs)):]

modelObs = Sequential()
modelObs.add(Dense(64, input_dim=9, activation='relu'))
modelObs.add(Dense(32, activation='relu'))
modelObs.add(Dense(16, activation='relu'))
modelObs.add(Dense(1, activation='sigmoid'))
modelObs.compile(loss='mean_squared_error', optimizer=Adam())
modelObs.fit(pd.DataFrame(xObsTrain), pd.DataFrame(yObsTrain), epochs=20, batch_size=16)

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
    print(mean_squared_error(yObsVal, modelObs.predict(xObsVal)))
    with open('ds/modelObs.pkl', 'wb') as j:
        pickle.dump(modelObs, j)
    print('Models created and saved.')

### Restriction model

xRes = []
yRes = []
for k, v in res.items():
    vals = v.copy()
    del vals['restriction']
    xRes.append(list(vals.values()))
    yRes.append(v['restriction'])

xResTrain = xRes[:int(0.8 * len(xRes))]
yResTrain = yRes[:int(0.8 * len(yRes))]
xResval = xRes[int(0.8 * len(xRes)):]
yResval = yRes[int(0.8 * len(yRes)):]

modelRes = LogisticRegression(class_weight="balanced")
modelRes.fit(xResTrain, yResTrain)

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