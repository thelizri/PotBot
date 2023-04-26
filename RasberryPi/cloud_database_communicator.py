import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Replace 'path/to/your-service-account-key.json' with the path to the JSON file you downloaded
cred = credentials.Certificate('firebase-key.json')

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://potbot-9f9ff-default-rtdb.europe-west1.firebasedatabase.app/'
})

def push_data(data):
    # Replace 'your_database_path' with the path where you want to push the data
    ref = db.reference('RaspberryPiTest')
    ref.push(data)

# Sample data to be pushed
sample_data = {
    'name': 'Otto Doe',
    'email': 'ottodoe@example.com',
    'age': 90
}

push_data(sample_data)


