import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import json

# Replace 'path/to/your-service-account-key.json' with the path to the JSON file you downloaded
cred = credentials.Certificate('/home/pi/PotBot/RasberryPi/firebase-key.json') #Replace with real path for the raspberry pi

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://potbot-9f9ff-default-rtdb.europe-west1.firebasedatabase.app/'
})

def push_data(data, product_id):
    # Replace 'your_database_path' with the path where you want to push the data
    ref = db.reference(r'https://potbot-9f9ff-default-rtdb.europe-west1.firebasedatabase.app/users/ffJEWDC2nfMi6BFu7fS1mKkRXnC3/plants/Parasollpilea')
    #child = ref.child(data["dateAndTime"])
    child.update(data)

def read_json_and_push(filepath, product_id):
    file = open(filepath)
    data = json.load(file)
    file.close()

    #Deletes content
    with open(filepath, 'w'):
        pass

    data['product-id'] = product_id
    push_data(data, product_id)

read_json_and_push('last_measurement.json', 'raspberry-1')
