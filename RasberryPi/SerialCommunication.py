#!/usr/bin/env python3
import serial
import time

port = serial.Serial('/dev/ttyACM0', 115200, timeout=1.0)
time.sleep(3)
port.reset_input_buffer()
print("Serial OK")

try:
	while True:
		time.sleep(1)
		print("Send message to Arduino")
		port.write("Hello from Raspberry Pi\n".encode("utf-8"))
		while port.in_waiting <= 0:
			time.sleep(0.01)
		response = port.readline().decode('utf-8').rstrip()
		print(response)
except KeyboardInterrupt:
	print("Closing Serial Communication")
	port.close()
