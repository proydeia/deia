import pandas as pd

df = pd.read_csv('ds/datasetgold.csv')
obs = df[['FEV1', 'FVC', 'Edad', 'Sexo', 'Talla', 'Obstruction']]
obs.to_json('ds/obsgoldv2.json', orient='records')

res = df[['FEV1', 'FVC', 'Edad', 'Sexo', 'Talla', 'Restriction']]
res.to_json('ds/resgoldv2.json', orient='records')