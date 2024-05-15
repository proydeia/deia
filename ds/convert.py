import json
import google.generativeai as genai
import os
import dotenv

def json_to_obj(path):
    with open(path) as f:
        return json.load(f)
    
dotenv.load_dotenv('ds/.env')

obj = json_to_obj('ds/example.json')
genai.configure(api_key=os.environ['API_KEY'])
model = genai.GenerativeModel()
response = model.generate_content('I will now send you a text message with extra data about someone. I want you to send me, in messages separated by a new line, the format specified in each of the following factors: smoking (a number 0 (if they dont) or 1 (if they do)), age (a whole number), sex (a number 0 (male) or 1 (female)), height (a whole number), weight (a floating number). Just send me the data in parenthesis and nothing more. If you understand respond "Ok.".')
print(response.text)

for k, v in obj.items():
    #print(f'{k}: {v}')

    keys = []
    vals = []
    for k2, v2 in v.items():
        keys.append(k2)
        vals.append(v2)

    vObs = {}
    vRes = {}

    if vals[10] == 0:
        notasExtra = vals[11]

        valsExtra = [-1 for _ in range(5)]

        if vals[6] < 1:
            vObs["obstruction"] = v["correctionobsmed"]
            vObs["fev1"] = v["fev1"]
            vObs["fev1pred"] = v["fev1pred"]
            vObs["fvc"] = v["fvc"]
            vObs["fvcpred"] = v["fvcpred"]


        if vals[8] < 1:
            pass