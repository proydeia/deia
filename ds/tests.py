import requests

example = {
    "fev1": 1.2,
    "fvc": 2.0,
    "edad": 18,
    "sexo": 1,
    "altura": 172
}

def test_obstruction_gold_analysis():
    response = requests.post("http://localhost:8000/obstructiongold", json=example)
    assert response.status_code == 200

def test_obstruction_gli_analysis():
    response = requests.post("http://localhost:8000/obstructiongli", json=example)
    assert response.status_code == 200
    assert response.json()["result"] != -1 # Negative values are not allowed in the input json

def test_obstruction_ai_gold():
    response = requests.post("http://localhost:8000/obstructionaigold", json=example)
    assert response.status_code == 200
    assert response.json()["result"] != -1

def test_obstruction_ai_gli():
    response = requests.post("http://localhost:8000/obstructionaigli", json=example)
    assert response.status_code == 200
    assert response.json()["result"] != -1

def test_obstruction_ai_gli_categorical():
    response = requests.post("http://localhost:8000/obstructionaiglicategorical", json=example)
    assert response.status_code == 200
    assert response.json()["result1"] != -1
    assert response.json()["result2"] != -1

def test_restriction_gold_analysis():
    response = requests.post("http://localhost:8000/restrictiongold", json=example)
    assert response.status_code == 200

def test_restriction_gli_analysis():
    response = requests.post("http://localhost:8000/restrictiongli", json=example)
    assert response.status_code == 200
    assert response.json()["result"] != -1 # Negative values are not allowed in the input json

def test_restriction_ai_gold():
    response = requests.post("http://localhost:8000/restrictionaigold", json=example)
    assert response.status_code == 200
    assert response.json()["result"] != -1

def test_restriction_ai_gli():
    response = requests.post("http://localhost:8000/restrictionaigli", json=example)
    assert response.status_code == 200
    assert response.json()["result"] != -1