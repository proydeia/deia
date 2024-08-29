from sklearn.linear_model import LogisticRegression
from sklearn.metrics import mean_squared_error, accuracy_score
from sklearn.model_selection import train_test_split
import pickle
import json
import os
import pandas as pd
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
from keras.src.models import Sequential
from keras.src.layers import Dense
from keras.src.optimizers import Adam
import numpy as np

def CompareKerasModels(model1, model2, valDataX, valDataY):
    score1 = mean_squared_error(valDataY, model1.predict(pd.DataFrame(valDataX)))
    score2 = mean_squared_error(valDataY, model2.predict(pd.DataFrame(valDataX)))
    return score1, score2

def CompareKerasCategoricalModels(model1, model2, valDataX, valDataY):
    score1 = accuracy_score(valDataY, model1.predict(pd.DataFrame(valDataX)))
    score2 = accuracy_score(valDataY, model2.predict(pd.DataFrame(valDataX)))
    return score1, score2

def CompareLogisticModels(model1, model2, valDataX, valDataY):
    score1 = accuracy_score(valDataY, model1.predict(valDataX))
    score2 = accuracy_score(valDataY, model2.predict(valDataX))
    return score1, score2

obs = None
with open('ds/obsgli.json') as f:
    obs = json.load(f)

res = None
with open('ds/resgli.json') as f:
    res = json.load(f)

### Obstruction model 1

xObs = []
yObs = []
for item in obs:
    yObs.append(item['Obstruction'] / 4)
    del item['Obstruction']
    xObs.append(list(item.values()))

xObsTrain, xObsVal, yObsTrain, yObsVal = train_test_split(xObs, yObs, test_size=0.25, random_state=42)

modelObs = Sequential()
modelObs.add(Dense(8, activation='relu'))
modelObs.add(Dense(16, activation='relu'))
modelObs.add(Dense(32, activation='relu'))
modelObs.add(Dense(64, activation='relu'))
modelObs.add(Dense(128, activation='relu'))
modelObs.add(Dense(256, activation='relu'))
modelObs.add(Dense(128, activation='relu'))
modelObs.add(Dense(64, activation='relu'))
modelObs.add(Dense(32, activation='relu'))
modelObs.add(Dense(1, activation='sigmoid'))
modelObs.compile(loss='mean_squared_error', optimizer=Adam())
modelObs.fit(pd.DataFrame(xObsTrain), pd.DataFrame(yObsTrain), epochs=25, batch_size=32, validation_data=(pd.DataFrame(xObsVal), pd.DataFrame(yObsVal)))

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

### Obstruction model 2

for i in range(len(yObs)):
    yObs[i] *= 4

xObsTrain, xObsVal, yObsTrain, yObsVal = train_test_split(xObs, yObs, test_size=0.25, random_state=42)

modelObs = Sequential()
modelObs.add(Dense(8, activation='relu'))
modelObs.add(Dense(16, activation='relu'))
modelObs.add(Dense(32, activation='relu'))
modelObs.add(Dense(64, activation='relu'))
modelObs.add(Dense(32, activation='relu'))
modelObs.add(Dense(5, activation='softmax'))
modelObs.compile(loss='sparse_categorical_crossentropy', optimizer=Adam(), metrics=['accuracy'])
modelObs.fit(pd.DataFrame(xObsTrain), pd.DataFrame(yObsTrain), epochs=25, batch_size=32, validation_data=(pd.DataFrame(xObsVal), pd.DataFrame(yObsVal)))

if os.path.exists('ds/modelObsClassification.pkl'):
    with open('ds/modelObsClassification.pkl', 'rb') as f:
        modelObsOld = pickle.load(f)
        score1, score2 = CompareKerasCategoricalModels(modelObs, modelObsOld, xObsVal, yObsVal)
        print(score1, score2)
        if score1 > score2:
            print('New model is better.')
            with open('ds/modelObsClassification.pkl', 'wb') as j:
                pickle.dump(modelObs, j)
        else:
            print('Old model is better or equal.')
else:
    with open('ds/modelObsClassification.pkl', 'wb') as j:
        pickle.dump(modelObs, j)
    print('Models created and saved.')

### Restriction model

xRes = []
yRes = []
for item in res:
    yRes.append(item['Restriction'])
    del item['Restriction']
    xRes.append(list(item.values()))

xResTrain, xResval, yResTrain, yResval = train_test_split(xRes, yRes, test_size=0.25, random_state=42)

modelRes = LogisticRegression(class_weight="balanced")
modelRes.fit(np.array(xResTrain), np.array(yResTrain))

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