import pandas as pd
import json

data = pd.read_csv('ds/data_to_convert.csv').values.tolist()
#print(data)

d = {}

for i, entry in enumerate(data):
    e = {}
    e["obstruction"] = -1
    e["restriction"] = -1
    e["fev1"] = entry[0]
    e["fev1pred"] = entry[1]
    e["fvc"] = entry[4]
    e["fvcpred"] = entry[5]
    e["correctionobs"] = 0
    e["correctionobsmed"] = -1
    e["correctionrest"] = 0
    e["correctionrestmed"] = -1
    e["enjson"] = 0
    e["notasextra"] = ""
    e["fuma"] = -1
    e["edad"] = -1
    e["sexo"] = -1
    e["altura"] = -1
    e["peso"] = -1
    d[f'pulmopred_{i}'] = e

path_to_datadump = 'ds/datadump.json'
datadump = pd.read_json(path_to_datadump).to_dict()

# add d to datadump
datadump.update(d)

with open(path_to_datadump, 'w') as f:
    json.dump(datadump, f)