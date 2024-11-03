from sklearn.linear_model import LogisticRegression
from sklearn.metrics import f1_score
from sklearn.model_selection import train_test_split
import pickle
import json
import os
import numpy as np

def CompareLogisticModels(model1, model2, valDataX, valDataY):
    score1 = f1_score(valDataY, model1.predict(valDataX))
    score2 = f1_score(valDataY, model2.predict(valDataX))
    return score1, score2

res = None
with open('ds/resgoldv2.json') as f:
    res = json.load(f)

xRes = []
yRes = []
for item in res:
    yRes.append(item['Restriction'])
    del item['Restriction']
    xRes.append(list(item.values()))

xResTrain, xResval, yResTrain, yResval = train_test_split(xRes, yRes, test_size=0.25, random_state=42)

modelRes = LogisticRegression(class_weight="balanced")
modelRes.fit(np.array(xResTrain), np.array(yResTrain))

if os.path.exists('ds/modelResGoldV2.pkl'):
    with open('ds/modelResGoldV2.pkl', 'rb') as f:
        modelResOld = pickle.load(f)
        score1, score2 = CompareLogisticModels(modelRes, modelResOld, xResval, yResval)
        print(score1, score2)
        if score1 > score2:
            with open('ds/modelResGoldV2.pkl', 'wb') as j:
                pickle.dump(modelRes, j)
        else:
            print('Old model is better or equal.')
else:
    with open('ds/modelResGoldV2.pkl', 'wb') as j:
        pickle.dump(modelRes, j)
    print('Models created and saved.')