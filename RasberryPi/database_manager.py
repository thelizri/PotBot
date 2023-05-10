from error_handler import handle_errors
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import json
import time
import os
import utils


class DatabaseManager:
    def __init__(self, key_path):
        self.abspath = os.path.dirname(os.path.abspath(__file__))
        os.chdir(self.abspath)
        self.cred = None
        self.uid = None
        self.plant_id = None
        self.key_path = key_path
        self.cred = credentials.Certificate(
            "/home/pi/PotBot/RasberryPi/firebase-key.json"
        )
        firebase_admin.initialize_app(
            self.cred,
            {
                "databaseURL": "https://potbot-9f9ff-default-rtdb.europe-west1.firebasedatabase.app/"
            },
        )

        try:
            with open("user.id", "r") as uid_file:
                self.uid = uid_file.readline().strip()
            with open("plant.id", "r") as plant_id_file:
                self.plant_id = plant_id_file.readline().strip()
            self.setupComplete = True
        except Exception as error:
            handle_errors("database_manager_error.log", error)

    def fetch_user_email(self):
        ref = db.reference(f"/users/{self.uid}/email")
        data = ref.get()
        with open("email.id", "w") as file:
            file.write(data)

    def fetch_user_notification_setting(self):
        ref = db.reference(f"/users/{self.uid}/notificationSettings/notificationToggle")
        return ref.get()

    def push_data(self, data):
        ref = db.reference(f"/users/{self.uid}/plants/{self.plant_id}")
        ref.child("measureData").update(data)

    def get_settings(self):
        ref = db.reference(f"/users/{self.uid}/plants/{self.plant_id}/settings")
        while True:
            print("get_settings()")
            try:
                with open("settings.json", "w") as file:
                    data = ref.get()
                    json.dump(data, file)
                    data["water"] = 0
                    ref.update(data)
                time.sleep(10)
            except KeyboardInterrupt:
                return None

    def read_json(self, filepath):
        if True:
            if not utils.check_if_file_exist_and_is_not_empty(filepath):
                time.sleep(5)
                return None

            with open(filepath) as file:
                data = json.load(file)

            self.push_data(data)

    def run(self):
        while True:
            print("database_manager.run()")
            try:
                self.read_json("last_measurement.json")
                time.sleep(60)
            except Exception as error:
                handle_errors("database_manager_error.log", error)
