#!/usr/bin/env python3
from datetime import datetime
import json
import serial
import time

def storemeasurements(measurements):

    dictionary = {
        'date': f'{datetime.now().strftime("%d-%m-%Y")}',
        'time': f'{datetime.now().strftime("%H:%M")}',
        'waterLevel': measurements[0],
        'temperature': f'{measurements[1]}°C',
        'uvIntensity': f'{measurements[2]}mW/cm^2',
        'soilMoisture': f'{measurements[3]}%'
    }

    with open('last_measurement.json', 'w') as file:
        json.dump(dictionary, file)

if __name__ == '__main__':
    port = serial.Serial('/dev/ttyACM0', 115200, timeout=1.0)
    time.sleep(3)
    port.reset_input_buffer()
    print("Serial OK")

    try:
        measurements = []
        while True:
            time.sleep(1)
            while port.in_waiting <= 0:
                time.sleep(1)
            arduino_data = port.readline().decode('utf-8').rstrip()
            if arduino_data:
                print(f'{arduino_data}')
                measurements = arduino_data.split(' ')
            storemeasurements(measurements)
    except KeyboardInterrupt:
        print("Closing Serial Communication")
        port.close()
