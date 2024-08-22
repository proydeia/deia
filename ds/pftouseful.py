import pandas as pd
from gli_api import get_fev1_pred, get_fvc_pred, get_fev1_fvc_pred, predictobsGLI, predictresgli

df = pd.read_csv('ds/PRUEBA FINAL.csv', encoding='latin1', sep=";")

groupfev1 = df.groupby("Prueba")
groupfvc = df.groupby("Prueba")

fev1s = groupfev1["FEV1       (l)  "].max().apply(lambda x: x.replace(',', '.')).apply(lambda x: float(x))
fvcs = groupfvc["FVC        (l)  "].max().apply(lambda x: x.replace(',', '.')).apply(lambda x: float(x))
edades = groupfev1["Edad"].max().apply(lambda x: float(x))
tallas = groupfev1["Talla"].max().apply(lambda x: float(x))
sexos = groupfev1["Sexo"].max().apply(lambda x: int(x[0]))

newDF = pd.DataFrame({'FEV1': fev1s, 'FVC': fvcs, 'Edad': edades, 'Talla': tallas, 'Sexo': sexos})
newDF["FEV1/FVC"] = newDF["FEV1"] / newDF["FVC"]

newDF["FEV1_pred"] = newDF.apply(lambda x: get_fev1_pred(x["Sexo"], x["Edad"], x["Talla"])['M'], axis=1)
newDF["FEV1_lln"] = newDF.apply(lambda x: get_fev1_pred(x["Sexo"], x["Edad"], x["Talla"])['LLN'], axis=1)
newDF["FEV1_s"] = newDF.apply(lambda x: get_fev1_pred(x["Sexo"], x["Edad"], x["Talla"])['S'], axis=1)
newDF["FVC_pred"] = newDF.apply(lambda x: get_fvc_pred(x["Sexo"], x["Edad"], x["Talla"])['M'], axis=1)
newDF["FVC_lln"] = newDF.apply(lambda x: get_fvc_pred(x["Sexo"], x["Edad"], x["Talla"])['LLN'], axis=1)
newDF["FEV1/FVC_pred"] = newDF.apply(lambda x: get_fev1_fvc_pred(x["Sexo"], x["Edad"], x["Talla"])['M'], axis=1)
newDF["FEV1/FVC_lln"] = newDF.apply(lambda x: get_fev1_fvc_pred(x["Sexo"], x["Edad"], x["Talla"])['LLN'], axis=1)
newDF["Obstruction"] = newDF.apply(lambda x: predictobsGLI(x["FEV1"], x["FVC"], x["FEV1_lln"], x["FEV1_s"], x["FEV1/FVC_lln"]), axis=1)
newDF["Restriction"] = newDF.apply(lambda x: predictresgli(x["FEV1"], x["FVC"], x["FEV1/FVC_lln"], x["FVC_lln"]), axis=1)

newDF.to_csv('ds/datasetgli.csv', index=False)