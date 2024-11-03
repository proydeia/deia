import pandas as pd
from gli_api import get_fev1_pred, get_fvc_pred, get_fev1_fvc_pred

df = pd.read_csv('ds/dataset creation/PRUEBA FINAL.csv', encoding='latin1', sep=";")

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

def calculate_obstruction(spirometry):
    if spirometry["FEV1"] / spirometry["FVC"] >= 0.7:
        return 0
    if spirometry["FEV1_pred"] == -1:
        fev1pred = get_fev1_pred(spirometry["Sexo"], spirometry["Edad"], spirometry["Talla"])["M"]
    else:
        fev1pred = spirometry["FEV1_pred"]
    res = spirometry["FEV1"] / fev1pred
    if res < 0.3:
        return 4  # Muy Severo - GOLD 4
    elif res < 0.5:
        return 3  # Severo - GOLD 3
    elif res < 0.8:
        return 2  # Moderado - GOLD 2
    else:
        return 1  # Leve - GOLD 1

newDF["Obstruction"] = newDF.apply(lambda x: calculate_obstruction(x), axis=1)

def calculate_restriction(spirometry):
    resres = -1
    f1res = spirometry["FEV1"] / spirometry["FVC"]
    if f1res < 0.7:
        return 0
    if spirometry["FEV1_pred"] == -1:
        fvcpred = get_fvc_pred(spirometry["Sexo"], spirometry["Edad"], spirometry["Talla"])["M"]
    else:
        fvcpred = spirometry["FEV1_pred"]
    fvctopred = spirometry["FVC"] / fvcpred
    if fvctopred <= 0.8:
        resres = 1
    else:
        resres = 0
    return resres

newDF["Restriction"] = newDF.apply(lambda x: calculate_restriction(x), axis=1)

newDF.to_csv('ds/datasetgold.csv', index=False)