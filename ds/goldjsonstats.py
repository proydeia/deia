import json
import requests
import tqdm

dir = "http://localhost:8000/"

obsGold = None
with open('ds/obs.json') as f:
    obsGold = json.load(f)

resGold = None
with open('ds/res.json') as f:
    resGold = json.load(f)

resultsobs = []
resultsres = []

for i in tqdm.tqdm(range(len(list(obsGold.items())))):
    item = list(obsGold.items())[i][1]
    #item['fev1pred'] = -1
    #item['fvcpred'] = -1
    #item['altura'] = 168
    #item['sexo'] = random.choice([0, 1])
    #item['edad'] = random.randint(20, 60)
    r = requests.post(dir + 'obstructiongold', json=item)
    try:
        #print(r.json()["result"])
        resultsobs.append(r.json()["result"])
    except:
        print('Error:', r.text)

print('Obs:', resultsobs)
print('Obs:', {i: resultsobs.count(i) for i in range(5)})

for i in tqdm.tqdm(range(len(list(resGold.items())))):
    item = list(resGold.items())[i][1]
    #item['fev1pred'] = -1
    #item['fvcpred'] = -1
    #item['altura'] = 168
    #item['sexo'] = random.choice([0, 1])
    #item['edad'] = random.randint(20, 60)
    r = requests.post(dir + 'restrictiongold', json=item)
    try:
        #print(r.json()["result"])
        resultsres.append(r.json()["result"])
    except:
        print('Error:', r.text)

print('Res:', resultsres)
print('Res:', {i: resultsres.count(i) for i in range(2)})