from error_handler import handle_errors
import json
import time
import os
import arduino_manager
import utils

try:
    abspath = os.path.dirname(os.path.abspath(__file__))
    os.chdir(abspath)
except Exception as error:
    handle_errors("_controller_error.log", error)

def manual(data):
    if data["water"] == 1:
        measurements = json.load(open("last_measurement.json"))
        measurements = list(measurements.values())[0]
        if measurements["soilMoisture"] < data["soil_moisture"]:
            arduino_manager.turn_on_water_pump(data["amount"])
            print("Turned on water pump")
        data["water"] = 0
        file = open("settings.json", "w")
        json.dump(data, file)
        file.close()

def automatic(data):
    if utils.should_plant_be_watered(1):
        measurements = json.load(open("last_measurement.json"))
        measurements = list(measurements.values())[0]
        if measurements["soilMoisture"] < data["soil_moisture"]:
            arduino_manager.turn_on_water_pump(data["amount"])
            print("Turned on water pump")

def frequency(data):
    if utils.should_plant_be_watered(data["frequency"]):
        arduino_manager.turn_on_water_pump(data["amount"])
        print("Turned on water pump")

def run():
    print("pump_controller")
    if not utils.check_if_file_exist_and_is_not_empty("settings.json"):
        return None

    while True:
        with open("settings.json") as file:
            data = json.load(file)
            if data["type"] == "Manual":
                manual(data)
            elif data["type"] == "Automatic":
                automatic(data)
            elif data["type"] == "Frequent":
                frequency(data)
            else:
                print("Incorrect type. Check the settings.")
            time.sleep(20)