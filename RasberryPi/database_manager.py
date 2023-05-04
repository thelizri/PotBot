def handle_errors(error):
    logfile = open("database_manager_error.log", "w+")
    logfile.write(str(error))


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
cred = credentials.Certificate("/home/pi/PotBot/RasberryPi/firebase-key.json")
#cred = credentials.Certificate(r'C:\Users\karlw\Documents\Code\PotBot\RasberryPi\firebase-key.json')

firebase_admin.initialize_app(
    cred,
    {
        "databaseURL": "https://potbot-9f9ff-default-rtdb.europe-west1.firebasedatabase.app/"
    },
)


def push_data(data):
    # Replace 'your_database_path' with the path where you want to push the
    # data
    ref = db.reference(
        "/users/ffJEWDC2nfMi6BFu7fS1mKkRXnC3/plants/Parasollpilea"
    )
    #child = ref.child(data["date"])
    #grandchild = child.child(data["time"])
    #grandchild.update(data)
    ref.child("measureData").update(data)

def get_settings():
    ref = db.reference(
        "/users/ffJEWDC2nfMi6BFu7fS1mKkRXnC3/plants/Parasollpilea/settings"
    )
    while True:
        try:
            with open("settings.json", "w") as file:
                data = ref.get()
                json.dump(data, file)
                data["water"]=0
                ref.update(data)
            time.sleep(30)
        except KeyboardInterrupt:
            return None


def read_json(filepath):
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

        push_data(data)
        print("Finished with cloud")


def run():
    try:
        read_json("last_measurement.json")
    except Exception as error:
        handle_errors(error)

if __name__ == "__main__":
    run()
