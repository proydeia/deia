from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight
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
    score1 = mean_absolute_error(valDataY, model1.predict(np.array(valDataX)))
    score2 = mean_absolute_error(valDataY, model2.predict(np.array(valDataX)))
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

# Calculate class weights
class_weights = compute_class_weight('balanced', classes=np.unique(yObsTrain), y=yObsTrain)
class_weights_dict = dict(enumerate(class_weights))

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
modelObs.compile(loss='mean_absolute_error', optimizer=Adam())
modelObs.fit(np.array(xObsTrain), np.array(yObsTrain), epochs=100, batch_size=32, validation_data=(np.array(xObsVal), np.array(yObsVal)), class_weight=class_weights_dict)

if os.path.exists('ds/modelObsGLI.pkl'):
    with open('ds/modelObsGLI.pkl', 'rb') as f:
        modelObsOld = pickle.load(f)
        score1, score2 = CompareKerasModels(modelObs, modelObsOld, xObsVal, yObsVal)
        print(score1, score2)
        if score1 < score2:
            print('New model is better.')
            with open('ds/modelObsGLI.pkl', 'wb') as j:
                pickle.dump(modelObs, j)
        else:
            print('Old model is better or equal.')
else:
    with open('ds/modelObsGLI.pkl', 'wb') as j:
        pickle.dump(modelObs, j)
    print('Models created and saved.')