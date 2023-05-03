#!/usr/bin/env python3
from datetime import datetime
from math import floor
import json
import serial
import time
import os
import database_manager as db

abspath = os.path.dirname(os.path.abspath(__file__))
os.chdir(abspath)


def storemeasurements(measurements):
    dictionary = {
	f"{floor(datetime.now().timestamp())}": {
            "dateTime": f'{datetime.now().strftime("%Y-%m-%d %H:%M:%S")}',
            "waterLevel": (int)measurements[0],
            "temperature": {(float)measurements[1]},
            "uvIntensity": {(float)measurements[2]},
            "soilMoisture": {(int)measurements[3]},
        }
    }

    with open("last_measurement.json", "w") as file:
        json.dump(dictionary, file)


if __name__ == "__main__":
    port = serial.Serial("/dev/ttyACM0", 115200, timeout=1.0)
    time.sleep(3)
    port.reset_input_buffer()
    print("Serial OK")

    try:
        measurements = []
        while True:
            time.sleep(1)
            while port.in_waiting <= 0:
                time.sleep(1)
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
        log = open("arduino_manager_error.log", "w+")
        log.write(str(error))
