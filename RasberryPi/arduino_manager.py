#!/usr/bin/env python3
from datetime import datetime
from error_handler import handle_errors
from math import floor
from threading import Thread
import json
import serial
import time
import os
import database_manager as db

abspath = os.path.dirname(os.path.abspath(__file__))
os.chdir(abspath)


def storemeasurements(measurements):
    measurements[0] = int(measurements[0])
    measurements[1] = float(measurements[1])
    measurements[2] = float(measurements[2])
    measurements[3] = int(measurements[3])

    dictionary = {
	f"{floor(datetime.now().timestamp())}": {
            "dateTime": f'{datetime.now().strftime("%Y-%m-%d %H:%M:%S")}',
            "waterLevel": measurements[0],
            "temperature": measurements[1],
            "uvIntensity": measurements[2],
            "soilMoisture": measurements[3],
        }
    }

    with open("last_measurement.json", "w") as file:
        json.dump(dictionary, file)

def turn_on_water_pump(ml, port):
    message = str(ml)+"\n"
    port.write(message.encode())

    dictionary = {"dateTime": f'{datetime.now().strftime("%Y-%m-%d %H:%M:%S")}'}
    with open("latest_time_plant_was_watered.json", "w") as file:
        json.dump(dictionary, file)

def check_settings(port):
    file = open("settings.json")
    data = json.load(file)
    file.close()
    if data["water"]==1:
        data["water"]=0
        turn_on_water_pump(data["amount"], port)
        file = open("settings.json", "w")
        json.dump(data, file)
        file.close()


if __name__ == "__main__":
    port = serial.Serial("/dev/ttyACM0", 115200, timeout=1.0)
    time.sleep(3)
    port.reset_input_buffer()
    print("Serial OK")

    try:
        measurements = []
        #create thread for fetching settings
        fetcher = Thread(target=db.get_settings)
        fetcher.start()
        while True:
            time.sleep(1)
            while port.in_waiting <= 0:
                check_settings(port)
                time.sleep(3)
            arduino_data = port.readline().decode("utf-8").rstrip()
            if arduino_data:
                print(f"{arduino_data}")
                measurements = arduino_data.split(" ")
            storemeasurements(measurements)
            db.run()
    except KeyboardInterrupt:
        print("Closing Serial Communication")
        port.close()

    # Print runtime exceptions to a log file
    except Exception as error:
        handle_errors("arduino_manager_error.log", error)
