from sklearn.linear_model import LogisticRegression
from sklearn.metrics import mean_squared_error, accuracy_score
import pickle
import json
import pandas as pd
from keras.models import Sequential
from keras.layers import Dense
from keras.optimizers import Adam
import os

modelObs = pickle.load(open('ds/modelObs.pkl', 'rb'))
modelRes = pickle.load(open('ds/modelRes.pkl', 'rb'))

example = {
    "obstruction": 1,"fev1": 1.09, "fev1pred": 0.3924, "fvc": 2.34, "fvcpred": 1.4507999999999999, "fuma": -1, "edad": -1, "sexo": -1, "altura": -1, "peso": -1
}
exampleX = [example[k] for k in example if k != 'obstruction']
exampleY = example['obstruction']

#TO BE CONTINUED