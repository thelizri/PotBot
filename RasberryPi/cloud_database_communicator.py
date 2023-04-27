import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import json
import time
import os

abspath = os.path.dirname(os.path.abspath(__file__))
os.chdir(abspath)

# Replace 'path/to/your-service-account-key.json' with the path to the JSON file you downloaded
cred = credentials.Certificate('/home/pi/PotBot/RasberryPi/firebase-key.json')
#cred = credentials.Certificate('C:\\Users\\karlw\\Documents\\Code\\PotBot\\firebase-key.json')

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://potbot-9f9ff-default-rtdb.europe-west1.firebasedatabase.app/'
})

def push_data(data):
    # Replace 'your_database_path' with the path where you want to push the data
    ref = db.reference('/users/ffJEWDC2nfMi6BFu7fS1mKkRXnC3/plants/Parasollpilea/measureData')
    child = ref.child(data['date'])
    grandchild = child.child(data['time'])
    grandchild.update(data)

def read_json_and_push(filepath, product_id):
    
    while True:
        if not os.path.exists(filepath):
            print("JSON file not found")
            time.sleep(5)
            continue

        if os.path.getsize(filepath) == 0:
            print("Empty JSON file")
            time.sleep(5)
            continue
        
        file = open(filepath)
        data = json.load(file)
        file.close()

        #Deletes content
        with open(filepath, 'w'):
            pass

        data['product-id'] = product_id
        push_data(data)
        time.sleep(5)

if __name__ == '__main__':
    read_json_and_push('last_measurement.json', 'raspberry-1')
