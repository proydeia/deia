from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import r2_score, accuracy_score
import pickle
import json
import pandas as pd
import os

minimum = 10

def CompareLinearModels(model1, model2, valDataX, valDataY):
    score1 = r2_score(valDataY, model1.predict(valDataX))
    score2 = r2_score(valDataY, model2.predict(valDataX))
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

obsEntries = len(obs)
if obsEntries >= minimum:
    xObs = []
    yObs = []
    for k, v in obs.items():
        vals = v.copy()
        del vals['obstruction']
#        del vals['fuma']
#        del vals['edad']
#        del vals['sexo']
#        del vals['altura']
#        del vals['peso']
        xObs.append(list(vals.values()))
        yObs.append(v['obstruction'])

    xObsTrain = xObs[:int(0.8 * len(xObs))]
    yObsTrain = yObs[:int(0.8 * len(yObs))]
    xObsVal = xObs[int(0.8 * len(xObs)):]
    yObsVal = yObs[int(0.8 * len(yObs)):]

    modelObs = LinearRegression()
    modelObs.fit(xObsTrain, yObsTrain)

    if os.path.exists('ds/modelObs.pkl'):
        with open('ds/modelObs.pkl', 'rb') as f:
            modelObsOld = pickle.load(f)
            score1, score2 = CompareLinearModels(modelObs, modelObsOld, xObsVal, yObsVal)
            print(score1, score2)
            if score1 > score2:
                modelObs = modelObsOld
                with open('ds/modelObs.pkl', 'wb') as j:
                    pickle.dump(modelObs, j)
            else:
                print('Old model is better or equal.')
    else:
        print(r2_score(yObsVal, modelObs.predict(xObsVal)))
        with open('ds/modelObs.pkl', 'wb') as j:
            pickle.dump(modelObs, j)
        print('Models created and saved.')
else:
    print('Too few entries.')

resEntries = len(res)
if resEntries >= minimum:
    xRes = []
    yRes = []
    for k, v in res.items():
        vals = v.copy()
        del vals['restriction']
#        del vals['fuma']
#        del vals['edad']
#        del vals['sexo']
#        del vals['altura']
#        del vals['peso']
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
else:
    print('Too few entries.')