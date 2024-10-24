import requests

gold_example = {
    "fev1": 1.2,
    "fev1pred": 1.5,
    "fvc": 2.0,
    "fvcpred": 2.1,
    "edad": -1,
    "sexo": 1,
    "altura": -1,
    "peso": -1
}

gli_example = {
    "fev1": 1.2,
    "fvc": 2.0,
    "edad": 18,
    "sexo": 1,
    "altura": 172
}

def test_obstruction_gold_analysis():
    response = requests.post("http://localhost:8000/obstructiongold", json=gold_example)
    assert response.status_code == 200

def test_obstruction_gli_analysis():
    response = requests.post("http://localhost:8000/obstructiongli", json=gli_example)
    assert response.status_code == 200
    assert response.json()["result"] != -1 # Negative values are not allowed in the input json

def test_obstruction_ai_gold():
    response = requests.post("http://localhost:8000/obstructionaigold", json=gold_example)
    assert response.status_code == 200
    assert response.json()["result"] != -1

def test_obstruction_ai_gli():
    response = requests.post("http://localhost:8000/obstructionaigli", json=gli_example)
    assert response.status_code == 200
    assert response.json()["result"] != -1

def test_obstruction_ai_gli_categorical():
    response = requests.post("http://localhost:8000/obstructionaiglicategorical", json=gli_example)
    assert response.status_code == 200
    assert response.json()["result1"] != -1
    assert response.json()["result2"] != -1

def test_restriction_gold_analysis():
    response = requests.post("http://localhost:8000/restrictiongold", json=gold_example)
    assert response.status_code == 200

def test_restriction_gli_analysis():
    response = requests.post("http://localhost:8000/restrictiongli", json=gli_example)
    assert response.status_code == 200
    assert response.json()["result"] != -1 # Negative values are not allowed in the input json

def test_restriction_ai_gold():
    response = requests.post("http://localhost:8000/restrictionaigold", json=gold_example)
    assert response.status_code == 200
    assert response.json()["result"] != -1

def test_restriction_ai_gli():
    response = requests.post("http://localhost:8000/restrictionaigli", json=gli_example)
    assert response.status_code == 200
    assert response.json()["result"] != -1