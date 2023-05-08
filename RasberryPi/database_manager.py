from error_handler import handle_errors

try:
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import db
except Exception as error:
    handle_errors("database_manager_error.log", error)
import json
import time
import os
import utils

abspath = os.path.dirname(os.path.abspath(__file__))
os.chdir(abspath)

setupComplete = False
cred, uid, plant_id = None, None, None

def setup(name):
    global cred, uid, plant_id, setupComplete
    # Replace 'path/to/your-service-account-key.json' with the path to the
    # JSON file you downloaded
    cred = credentials.Certificate("/home/pi/PotBot/RasberryPi/firebase-key.json")
    # cred = credentials.Certificate(r'C:\Users\karlw\Documents\Code\PotBot\RasberryPi\firebase-key.json')

    firebase_admin.initialize_app(
        cred,
        {
            "databaseURL": "https://potbot-9f9ff-default-rtdb.europe-west1.firebasedatabase.app/"
        },
        name=name
    )

    try:
        uid_file = open("user.id", "r")
        plant_id_file = open("plant.id", "r")
    except Exception as error:
        handle_errors("database_manager_error.log", error)

    uid = uid_file.readline().strip()
    plant_id = plant_id_file.readline().strip()

    setupComplete = True

def push_data(data):
    if not setupComplete:
        setup("pusher")
    # Replace 'your_database_path' with the path where you want to push the
    # data
    ref = db.reference(f"/users/{uid}/plants/{plant_id}")
    ref.child("measureData").update(data)


def get_settings():
    if not setupComplete:
        setup("fetcher")
    ref = db.reference(
        f"/users/{uid}/plants/{plant_id}/settings"
    )
    while True:
        try:
            with open("settings.json", "w") as file:
                data = ref.get()
                json.dump(data, file)
                data["water"] = 0
                ref.update(data)
            time.sleep(30)
        except KeyboardInterrupt:
            return None


def read_json(filepath):
    if True:
        print("Cloud Start")
        if not utils.check_if_file_exist_and_is_not_empty(filepath):
            time.sleep(5)
            return None

        file = open(filepath)
        data = json.load(file)
        file.close()

        push_data(data)
        print("Finished with cloud")


def run():
    try:
        read_json("last_measurement.json")
    except Exception as error:
        handle_errors(error)


if __name__ == "__main__":
    run()
