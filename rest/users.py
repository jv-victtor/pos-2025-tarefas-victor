import requests

api_base = "https://jsonplaceholder.typicode.com/users"

def list():
    response = requests.get(api_base)
    return response.json()

def create(user_data):
    response = requests.post(api_base, json=user_data)
    return response.json()

def read(user_id):
    response = requests.get(f"{api_base}/{user_id}")
    return response.json()

def update(user_id, new_data):
    response = requests.put(f"{api_base}/{user_id}", json=new_data)
    return response.json()

def delete(user_id):
    response = requests.delete(f"{api_base}/{user_id}")
    return response.status_code == 204