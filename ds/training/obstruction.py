from sklearn.metrics import mean_squared_error
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

obs = None
with open('ds/obsgli.json') as f:
    obs = json.load(f)

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
    with open('ds/modelObs.pkl', 'wb') as j:
        pickle.dump(modelObs, j)
    print('Models created and saved.')