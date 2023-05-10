from error_handler import handle_errors
from threading import Thread
import json
import time
import os
import database_manager
import arduino_manager
import pump_controller

import email_manager
import user_pi_syncing
import utils
import gui_app

try:
    abspath = os.path.dirname(os.path.abspath(__file__))
    os.chdir(abspath)
except Exception as error:
    handle_errors("main_controller_error.log", error)


def check_water_level(db):
    while True:
        print("check_water_level")
        if not utils.check_if_file_exist_and_is_not_empty("last_measurement.json"):
            time.sleep(15)
            continue
        file = open("last_measurement.json")
        data = json.load(file)
        file.close()

        data = list(data.values())[0]
        waterLevel = data["waterLevel"]

        if waterLevel == 0:
            if db.fetch_user_notification_setting():
                email_manager.send_notification(db)
                print("The water level is low. Sending notification")
            else:
                print("Email notifications is disabled")

        time.sleep(600)


def run():
    try:
        # Get the correct ids from the database
        db = database_manager.DatabaseManager()
        user_pi_syncing.run(db)

        # Takes measurements from the arduino
        print("Creating arduino thread")
        arduino = Thread(target=arduino_manager.check_for_messages)
        arduino.start()

        # Fetches commands from the database
        print("Creating fetcher of settings")
        fetcher = Thread(target=db.get_settings)
        fetcher.start()

        # Pushes data to cloud database
        print("Create database runner. Pushes data to database")
        pusher = Thread(target=db.run)
        pusher.start()

        # Turns the pump on/off when necessary
        print("Create pump controller runner")
        pump = Thread(target=pump_controller.run)
        pump.start()

        # Checks water level periodically
        print("Create water level checker")
        water = Thread(target=check_water_level, args=(db,))
        water.start()

        # Turns on the graphical interface
        print("Turning on GUI app")
        gui = Thread(target=gui_app.run)
        gui.start()

        print("Created all threads")
    except Exception as error:
        handle_errors("main_controller_error.log", error)


if __name__ == "__main__":
    run()
