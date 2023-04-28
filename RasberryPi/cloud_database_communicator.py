try:
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import db
except Exception as error:
    handle_errors(error)
import json
import time
import os

abspath = os.path.dirname(os.path.abspath(__file__))
os.chdir(abspath)

# Replace 'path/to/your-service-account-key.json' with the path to the
# JSON file you downloaded
cred = credentials.Certificate('/home/pi/PotBot/RasberryPi/firebase-key.json')
# cred = credentials.Certificate('C:\\Users\\karlw\\Documents\\Code\\PotBot\\firebase-key.json')

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://potbot-9f9ff-default-rtdb.europe-west1.firebasedatabase.app/'
})


def push_data(data):
    # Replace 'your_database_path' with the path where you want to push the
    # data
    ref = db.reference(
        '/users/ffJEWDC2nfMi6BFu7fS1mKkRXnC3/plants/Parasollpilea/measureData')
    child = ref.child(data['date'])
    grandchild = child.child(data['time'])
    grandchild.update(data)


def read_json_and_push(filepath, product_id):

    if True:
        print("Cloud Start")
        if not os.path.exists(filepath):
            print("JSON file not found")
            time.sleep(5)
            return

        if os.path.getsize(filepath) == 0:
            print("Empty JSON file")
            time.sleep(5)
            return

        file = open(filepath)
        data = json.load(file)
        file.close()

        # Deletes content
        # with open(filepath, 'w'):
        #    pass

        data['product-id'] = product_id
        push_data(data)
        print("Finished with cloud")


def handle_errors(error):
    logfile = open('cloud_database_communicator_error.log', 'w+')
    logfile.write(str(error))


def run():
    try:
        read_json_and_push('last_measurement.json', 'raspberry-1')
    except Exception as error:
        handle_errors(error)
