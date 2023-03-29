#!/usr/bin/env python3
import serial
import time

port = serial.Serial('/dev/ttyACM0', 115200, timeout=1.0)
time.sleep(3)
port.reset_input_buffer()
print("Serial OK")

try:
	while True:
		time.sleep(0.01)
		if port.in_waiting > 0:
			line = port.readline().decode('utf-8').rstrip()
			print(line)
except KeyboardInterrupt:
	print("Closing Serial Communication")
	port.close()
