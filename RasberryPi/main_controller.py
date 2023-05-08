from datetime import datetime
from error_handler import handle_errors
from threading import Thread
import json
import time
import os
import database_manager
import arduino_manager
import email_manager
import user_pi_syncing
import utils

abspath = os.path.dirname(os.path.abspath(__file__))
os.chdir(abspath)


def check_settings():
    if not utils.check_if_file_exist_and_is_not_empty("settings.json"):
        return None

    file = open("settings.json")
    data = json.load(file)
    file.close()
    print("Opened settings file successfully")
    if data["water"] == 1:
        data["water"] = 0
        measurements = json.load(open("last_measurement.json"))
        measurements = list(measurements.values())[0]
        if measurements["soilMoisture"] < data["soil_moisture"]:
            arduino_manager.turn_on_water_pump(data["amount"])
            print("Turned on water pump")
        file = open("settings.json", "w")
        json.dump(data, file)
        file.close()


def check_water_level():
    while True:
        if not utils.check_if_file_exist_and_is_not_empty("last_measurement.json"):
            time.sleep(15)
            continue
        file = open("last_measurement.json")
        data = json.load(file)
        file.close()

        data = list(data.values())[0]
        waterLevel = data["waterLevel"]

        if waterLevel == 0:
            email_manager.send_notification()
            print("Low water level")

        time.sleep(600)


def run():
    try:
        # Get the correct ids from the database
        user_pi_syncing.run()

        # Fetches commands from the database
        fetcher = Thread(target=database_manager.get_settings)
        fetcher.start()

        # Takes measurements from the arduino
        arduino = Thread(target=arduino_manager.check_for_messages)
        arduino.start()

        # Checks water level periodically
        water = Thread(target=check_water_level)
        water.start()

        while True:
            check_settings()
            time.sleep(15)
    except Exception as error:
        handle_errors("main_controller_error.log", error)


if __name__ == "__main__":
    run()
