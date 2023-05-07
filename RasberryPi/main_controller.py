from datetime import datetime
from error_handler import handle_errors
from math import floor
from threading import Thread
import json
import serial
import time
import os
import database_manager
import arduino_manager
import email_manager

abspath = os.path.dirname(os.path.abspath(__file__))
os.chdir(abspath)

def check_settings(port):
    file = open("settings.json")
    data = json.load(file)
    file.close()
    if data["water"]==1:
        data["water"]=0
        measurements = json.load(open("last_measurement.json"))
        measurements = list(measurements.values())[0]
        if measurements["soilMoisture"]<data["soil_moisture"]:
            arduino_manager.turn_on_water_pump(data["amount"], port)
        file = open("settings.json", "w")
        json.dump(data, file)
        file.close()

def check_water_level():
    file = open("last_measurement.json")
    data = json.load(file)
    file.close()

    data = list(data.values())[0]
    waterLevel = data["waterLevel"]

    if waterLevel == 0:
        email_manager.send_notification()
    

def run():
    #Fetches commands from the database
    fetcher = Thread(target=database_manager.get_settings)
    fetcher.start()

    #Takes measurements from the arduino
    arduino = Thread(target=arduino_manager.check_for_messages)
    arduino.start()

    while True:
        check_settings()
        time.sleep(15)


if __name__ == "__main__":
    run()