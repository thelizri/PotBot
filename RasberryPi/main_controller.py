from datetime import datetime
from error_handler import handle_errors
from threading import Thread
import json
import time
import os
import database_manager as db
import arduino_manager as am

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
            am.turn_on_water_pump(data["amount"], port)
        file = open("settings.json", "w")
        json.dump(data, file)
        file.close()

def run():
    #Fetches commands from the database
    fetcher = Thread(target=db.get_settings)
    fetcher.start()

    #Takes measurements from the arduino
    arduino = Thread(target=am.check_for_messages)
    arduino.start()

    while True:
        check_settings()
        time.sleep(15)


if __name__ == "__main__":
    run()