import json
import google.generativeai as genai
import os
import dotenv

def json_to_obj(path):
    with open(path) as f:
        return json.load(f)
    
def obj_to_json(obj, path):
    with open(path, 'w') as f:
        json.dump(obj, f)
    
dotenv.load_dotenv('.env')

nombreDumpDB = 'datadump'
obj = json_to_obj(f'C:/Users/48110679/Desktop/git/deia/ds/{nombreDumpDB}.json')
nombreJsonObstruccion = 'obs'
obsJson = json_to_obj(f'C:/Users/48110679/Desktop/git/deia/ds/{nombreJsonObstruccion}.json')
nombreJsonRestriccion = 'res'
resJson = json_to_obj(f'C:/Users/48110679/Desktop/git/deia/ds/{nombreJsonRestriccion}.json')

def aivals(extrainfo):
    if extrainfo == "": return [-1, -1, -1, -1, -1]
    print("Processing AI...")
    genai.configure(api_key=os.environ['API_KEY'])
    starting_question = 'I will now send you a text message with extra data about someone. I want you to send me, in messages separated by a new line, the format specified in each of the following factors (give me a -1 if the factor isnt mentioned at all): smoking (a number 0 (if they dont) or 1 (if they do)), age (a whole number), sex (a number 0 (male) or 1 (female)), height (a floating number), weight (a floating number). Just send me the data in parenthesis and nothing more. Message:\n\n'  
    model = genai.GenerativeModel()
    response = model.generate_content(starting_question + extrainfo).text
    data = response.split('\n')
    correctData = []
    try:
        if ", " in data[0]:
            data = data[0].split(", ")
        for d in data:
            try:
                correctData.append(int(d.replace('(', '').replace(')', '')))
            except:
                correctData.append(float(d.replace('(', '').replace(')', '')))
    except:
        correctData = [-1, -1, -1, -1, -1]
    print(correctData)
    return correctData

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
        correctData = aivals(message)

        if vals[6] == 1:
            vObs["obstruction"] = v["correctionobsmed"]
        else:
            vObs["obstruction"] = v["obstruction"]
        vObs["fev1"] = v["fev1"]
        vObs["fev1pred"] = v["fev1pred"]
        vObs["fvc"] = v["fvc"]
        vObs["fvcpred"] = v["fvcpred"]
        vObs["fuma"] = correctData[0]
        vObs["edad"] = correctData[1]
        vObs["sexo"] = correctData[2]
        vObs["altura"] = correctData[3]
        vObs["peso"] = correctData[4]
        obsJson[k] = vObs

        if vals[8] == 1:
            vRes["restriction"] = v["correctionrestmed"]
        else:
            vRes["restriction"] = v["restriction"]
        vRes["fev1"] = v["fev1"]
        vRes["fev1pred"] = v["fev1pred"]
        vRes["fvc"] = v["fvc"]
        vRes["fvcpred"] = v["fvcpred"]
        vRes["fuma"] = correctData[0]
        vRes["edad"] = correctData[1]
        vRes["sexo"] = correctData[2]
        vRes["altura"] = correctData[3]
        vRes["peso"] = correctData[4]
        resJson[k] = vRes

        obj[k]["enjson"] = 1
    else:
        print(f'{k.capitalize()} ya chequeado!')

if dumpAHacer:
    obj_to_json(obj, f'ds/{nombreDumpDB}.json')
    obj_to_json(resJson, f'ds/{nombreJsonRestriccion}.json')
    obj_to_json(obsJson, f'ds/{nombreJsonObstruccion}.json')

    print("Dump finalizado!")
