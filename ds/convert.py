import json
import os
import dotenv

def json_to_obj(path):
    with open(path) as f:
        return json.load(f)
    
def obj_to_json(obj, path):
    with open(path, 'w') as f:
        json.dump(obj, f)
    
nombreDumpDB = 'datadump'
obj = json_to_obj(f'C:/Users/48110679/Desktop/git/deia/ds/{nombreDumpDB}.json')
nombreJsonObstruccion = 'obs'
obsJson = json_to_obj(f'C:/Users/48110679/Desktop/git/deia/ds/{nombreJsonObstruccion}.json')
nombreJsonRestriccion = 'res'
resJson = json_to_obj(f'C:/Users/48110679/Desktop/git/deia/ds/{nombreJsonRestriccion}.json')

dumpAHacer = False

for k, v in obj.items():

    keys = []
    vals = []
    for k2, v2 in v.items():
        keys.append(k2)
        vals.append(v2)

    vObs = {}
    vRes = {}

    if vals[10] == 0:
        dumpAHacer = True
        message = vals[11]

        if vals[6] == 1:
            vObs["obstruction"] = v["correctionobsmed"]
        else:
            vObs["obstruction"] = v["obstruction"]
        vObs["fev1"] = v["fev1"]
        vObs["fev1pred"] = v["fev1pred"]
        vObs["fvc"] = v["fvc"]
        vObs["fvcpred"] = v["fvcpred"]
        vObs["edad"] = v["edad"]
        vObs["sexo"] = v["sexo"]
        vObs["altura"] = v["altura"]
        vObs["peso"] = v["peso"]
        obsJson[k] = vObs

        if vals[8] == 1:
            vRes["restriction"] = v["correctionrestmed"]
        else:
            vRes["restriction"] = v["restriction"]
        vRes["fev1"] = v["fev1"]
        vRes["fev1pred"] = v["fev1pred"]
        vRes["fvc"] = v["fvc"]
        vRes["fvcpred"] = v["fvcpred"]
        vRes["edad"] = v["edad"]
        vRes["sexo"] = v["sexo"]
        vRes["altura"] = v["altura"]
        vRes["peso"] = v["peso"]
        resJson[k] = vRes

        obj[k]["enjson"] = 1
    else:
        print(f'{k.capitalize()} ya chequeado!')

if dumpAHacer:
    obj_to_json(obj, f'ds/{nombreDumpDB}.json')
    obj_to_json(resJson, f'ds/{nombreJsonRestriccion}.json')
    obj_to_json(obsJson, f'ds/{nombreJsonObstruccion}.json')

    print("Dump finalizado!")
