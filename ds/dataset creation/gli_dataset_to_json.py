import pandas as pd

df = pd.read_csv('ds/datasetgli.csv')
obs = df[['FEV1', 'FVC', 'Edad', 'Sexo', 'Talla', 'Obstruction']]
obs.to_json('ds/obsgli.json', orient='records')

res = df[['FEV1', 'FVC', 'Edad', 'Sexo', 'Talla', 'Restriction']]
res.to_json('ds/resgli.json', orient='records')