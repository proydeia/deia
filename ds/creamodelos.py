import sklearn
import pickle
import json

minimum = 10

obs = None
with open('ds/obs.json') as f:
    obs = json.load(f)

res = None
with open('ds/res.json') as f:
    res = json.load(f)

obsEntries = len(obs)
if obsEntries < minimum:
    xObs = []
    yObs = []
    for k, v in obs.items():
        vals = v.copy()
        del vals['obstruction']
        xObs.append(list(vals.values()))
        yObs.append(v['obstruction'])

    modelObs = sklearn.linear_model.LinearRegression()
    modelObs.fit(xObs, yObs)

    with open('ds/modelObs.pkl', 'wb') as f:
        pickle.dump(modelObs, f)

    print('Models created and saved.')
else:
    print('Too few entries.')

resEntries = len(res)
if resEntries < minimum:
    xRes = []
    yRes = []
    for k, v in res.items():
        vals = v.copy()
        del vals['restriction']
        xRes.append(list(vals.values()))
        yRes.append(v['restriction'])

    modelRes = sklearn.linear_model.LinearRegression()
    modelRes.fit(xRes, yRes)

    with open('ds/modelRes.pkl', 'wb') as f:
        pickle.dump(modelRes, f)

    print('Models created and saved.')
else:
    print('Too few entries.')