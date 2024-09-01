from sklearn.metrics import accuracy_score
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

def CompareKerasCategoricalModels(model1, model2, valDataX, valDataY):
    pred1 = np.argmax(model1.predict(pd.DataFrame(valDataX)), axis=1)
    pred2 = np.argmax(model2.predict(pd.DataFrame(valDataX)), axis=1)
    score1 = accuracy_score(valDataY, pred1)
    score2 = accuracy_score(valDataY, pred2)
    return score1, score2

obs = None
with open('ds/obsgli.json') as f:
    obs = json.load(f)

xObs = []
yObs = []
for item in obs:
    yObs.append(item['Obstruction'])
    del item['Obstruction']
    xObs.append(list(item.values()))

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