import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import json

# Replace 'path/to/your-service-account-key.json' with the path to the JSON file you downloaded
cred = credentials.Certificate('C:\\Users\\karlw\\Documents\\Code\\PotBot\\RasberryPi\\firebase-key.json') #Replace with real path for the raspberry pi

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://potbot-9f9ff-default-rtdb.europe-west1.firebasedatabase.app/'
})

def push_data(data):
    # Replace 'your_database_path' with the path where you want to push the data
    ref = db.reference('RaspberryPiSensorData')
    ref.push(data)

def read_json_and_push(filepath, product_id):
    file = open(filepath)
    data = json.load(file)
    file.close()

    for measurement in data['measurements']:
        measurement['product-id'] = product_id
        push_data(measurement)

read_json_and_push('example.json', '1-test-raspberry')