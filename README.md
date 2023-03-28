# PotBot
II1302 VT23 Projects and Project Methods  
Repository For Group 5

## Background
The idea behind this project is to create a smart plant pot that can automatically water plants, while also measuring and recording various environmental factors to ensure optimal plant growth. Here's a breakdown of each of the proposed features:

Automatic Plant Watering:
The smart plant pot will use sensors to detect the soil moisture levels and will water the plant automatically when the soil becomes too dry. This will ensure that the plant is always well hydrated without the need for manual watering.

Light Level Monitoring:
The smart plant pot will also measure and record the light levels around the plant, which is important for plant growth. The sensor can be placed at the top of the pot to measure the intensity of the light that the plant is receiving, and can be used to adjust the position of the pot to ensure that the plant is getting enough light.

Soil Moisture Monitoring:
The smart plant pot will measure and record the soil moisture levels, which is important to prevent over or under watering. The sensor can be placed in the soil and will detect the moisture content of the soil, providing data that can be used to trigger the automatic watering feature.

Temperature Monitoring:
The smart plant pot will also measure and record the temperature around the plant, which is important for plant growth. The sensor can be placed at the top of the pot to measure the ambient temperature and can be used to adjust the position of the pot to ensure that the plant is not exposed to extreme temperatures.

Overall, the smart plant pot will provide a convenient way to ensure that plants are healthy and thriving, without the need for constant monitoring and manual intervention. The data collected by the various sensors can also be used to analyze and optimize plant growth over time.

## Implementation
- [ ] Gather the required components: We will need a Raspberry Pi, an Arduino, sensors for measuring soil moisture, temperature, water level, and light level, a water pump, tubing, and a power supply.  
- [ ] Connect the sensors to the Arduino: Follow the wiring diagram for each sensor to connect it to Arduino's pins. You can use Arduino code to read data from each sensor.
- [ ] Build the water delivery system: Connect the water pump to a relay board and connect the relay board to the Arduino. Use Arduino code to trigger the relay to turn on the water pump when the soil moisture level falls below a certain threshold.
- [ ] Build the web interface: Host a web server on the Raspberry Pi using a Python web framework such as Flask. Build a user interface that displays the current values of the sensors and allows the user to set the watering threshold for each plant.
- [ ] Store the data collected by the sensors in a database. You can use Python code to insert and retrieve data from the database.
- [ ] Automatic watering: Use Arduino code to water the plant when the soil moisture level falls below a certain threshold. 
- [ ] Create code for displaying data in nice graphs and tables. There are several good python libraries for such tasks: Plotly, Matplotlib, or Seaborn for example.
- [ ] Test and refine: Test the system to make sure it is working as expected. Refine the system by adjusting the watering thresholds, refining the alerts, and improving the user interface.


## Developers 
Andreas: afranke@kth.se  
Mahad: mahadah@kth.se  
Otto: ottoeh@kth.se  
Pontus: kinnmark@kth.se  
Robert: rfu@kth.se  
Veronica: nadler@kth.se  
William: wcar@kth.se  

## Git Rules
1. Don't commit directly to master  
2. Don't merge your own commits  

# Arduino 
Arduino is an open-source electronics platform based on easy-to-use hardware and software. It uses a simplified version of C++ as its programming language. Here is a summary of some of the most important Arduino-specific functions:

- pinMode(pin, mode): Sets the specified pin to behave as either an INPUT or OUTPUT. The mode can be INPUT, OUTPUT, INPUT_PULLUP, or INPUT_PULLDOWN.
- digitalWrite(pin, value): Sets the specified pin to either HIGH or LOW, when the pin has been configured as an OUTPUT.
- digitalRead(pin): Reads the value of the specified digital pin. Returns HIGH or LOW.
- analogRead(pin): Reads the value from the specified analog pin. Returns an integer value between 0 and 1023, representing a voltage range of 0 to 5 volts (for most Arduino boards).
- analogWrite(pin, value): Generates a Pulse Width Modulation (PWM) signal on the specified pin, with a duty cycle between 0 (always off) and 255 (always on).
- millis(): Returns the number of milliseconds since the Arduino board started running the current program.
- micros(): Returns the number of microseconds since the Arduino board started running the current program.
- delay(ms): Pauses the program for a specified number of milliseconds.
- delayMicroseconds(us): Pauses the program for a specified number of microseconds.
- Serial.begin(baudRate): Initializes the serial communication at the specified baud rate.
- Serial.print(data):
