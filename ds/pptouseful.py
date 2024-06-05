from sklearn.linear_model import LinearRegression, LogisticRegression
import pickle
import pandas as pd
import json

with open('ds/datadump.json') as f:
    data = json.load(f)

datacsv = pd.read_csv('ds/data_to_convert.csv')

for key, value in data.items():
    if value["fev1pred"] > 5: data[key]["fev1pred"] = value["fev1"] * value["fev1pred"] / 100
    if value["fvcpred"] > 5: data[key]["fvcpred"] = value["fvc"] * value["fvcpred"] / 100

for key, value in data.items():
    if value["obstruction"] == -1:
        if value["fev1"] / value["fvc"] >= 0.7: 
            value["obstruction"] = 0
        else:
            res = value["fev1"] / value["fev1pred"]
            if res < 0.3:
                data[key]["obstruction"] = 4 #Muy Severo - GOLD 4
            elif res < 0.5:
                data[key]["obstruction"] = 3 #Severo - GOLD 3
            elif res < 0.8:
                data[key]["obstruction"] = 2 #Moderado - GOLD 2
            else:
                data[key]["obstruction"] = 1 #Leve - GOLD 1
        if datacsv.loc[int(key.split("_")[1])]["Label"] == "Obstructive" and data[key]["obstruction"] == 0:
            data[key]["correctionobsmed"] = 1
            data[key]["correctionobs"] = 1
        elif datacsv.loc[int(key.split("_")[1])]["Label"] == "Non-obstructive" and data[key]["obstruction"] == 1:
            data[key]["correctionobsmed"] = 0
            data[key]["correctionobs"] = 1

    if value["restriction"] == -1:
        if value["fev1"] / value["fvc"] < 0.7: 
            data[key]["restriction"] = 0
        else:
            res = value["fvc"] / value["fvcpred"]
            if res < 0.8:
                data[key]["restriction"] = 1
            else:
                data[key]["restriction"] = 0

json.dump(data, open('ds/datadump.json', 'w'))