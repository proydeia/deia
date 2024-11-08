from sklearn.metrics import f1_score
from sklearn.model_selection import train_test_split
import pickle
import json
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
from keras.src.models import Sequential
from keras.src.layers import Dense, Dropout, BatchNormalization
from keras.src.optimizers import Adam
from keras.src.callbacks import EarlyStopping
import numpy as np

def n_f1_score(model, X, y, n=2):
    # Get predictions (these are already probabilities if using softmax)
    y_prob = model.predict(np.array(X))
    
    # Get top n predictions for each sample
    top_n_preds = []
    for prob in y_prob:
        # Get indices of top n highest probabilities
        top_n_indices = np.argsort(prob)[-n:][::-1]
        top_n_preds.append(top_n_indices)
    
    y_pred = []
    for i, preds in enumerate(top_n_preds):
        y_pred.append(y[i] if y[i] in preds else preds[0])

    return f1_score(y, y_pred, average='macro')

def CompareKerasCategoricalModels(model1, model2, valDataX, valDataY):
    score1 = n_f1_score(model1, valDataX, valDataY)
    score2 = n_f1_score(model2, valDataX, valDataY)
    return score1, score2

obs = None
with open('ds/obsgoldv2.json') as f:
    obs = json.load(f)

xObs = []
yObs = []
for item in obs:
    yObs.append(item['Obstruction'])
    del item['Obstruction']
    xObs.append(list(item.values()))

xObsTrain, xObsVal, yObsTrain, yObsVal = train_test_split(xObs, yObs, test_size=0.3, random_state=42)

modelObs = Sequential()
modelObs.add(Dense(64, activation='relu', input_shape=(len(xObsTrain[0]),)))
modelObs.add(BatchNormalization())
modelObs.add(Dropout(0.5))
modelObs.add(Dense(128, activation='relu'))
modelObs.add(BatchNormalization())
modelObs.add(Dropout(0.5))
modelObs.add(Dense(64, activation='relu'))
modelObs.add(Dense(5, activation='softmax'))
modelObs.compile(loss='sparse_categorical_crossentropy', optimizer=Adam(), metrics=['accuracy'])
modelObs.fit(np.array(xObsTrain), np.array(yObsTrain), epochs=100, batch_size=32, validation_data=(np.array(xObsVal), np.array(yObsVal)), callbacks=[EarlyStopping(patience=15, restore_best_weights=True)])

if os.path.exists('ds/modelObsClassificationGold.pkl'):
    with open('ds/modelObsClassificationGold.pkl', 'rb') as f:
        modelObsOld = pickle.load(f)
        score1, score2 = CompareKerasCategoricalModels(modelObs, modelObsOld, xObsVal, yObsVal)
        print(score1, score2)
        if score1 > score2:
            print('New model is better.')
            with open('ds/modelObsClassificationGold.pkl', 'wb') as j:
                pickle.dump(modelObs, j)
        else:
            print('Old model is better or equal.')
else:
    with open('ds/modelObsClassificationGold.pkl', 'wb') as j:
        pickle.dump(modelObs, j)
    print('Models created and saved.')