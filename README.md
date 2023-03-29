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

# Arduino 
Arduino is an open-source electronics platform based on easy-to-use hardware and software. It uses a simplified version of C++ as its programming language. Here is a summary of some of the most important Arduino-specific functions:

- pinMode(pin, mode): Sets the specified pin to behave as either an INPUT or OUTPUT. The mode can be INPUT, OUTPUT, INPUT_PULLUP, or INPUT_PULLDOWN.
- digitalWrite(pin, value): Sets the specified pin to either HIGH or LOW, when the pin has been configured as an OUTPUT.
- digitalRead(pin): Reads the value of the specified digital pin. Returns HIGH or LOW.
- analogRead(pin): Reads the value from the specified analog pin. Returns an integer value between 0 and 1023, representing a voltage range of 0 to 5 volts (for most Arduino boards).
- analogWrite(pin, value): Generates a Pulse Width Modulation (PWM) signal on the specified pin, with a duty cycle between 0 (always off) and 255 (always on). 0 is the same as outputting 0 volts. And 255 is the same as outputting 5 volts. Writing 127 is approximately the same as outputting 2.5 volts.
- millis(): Returns the number of milliseconds since the Arduino board started running the current program.
- micros(): Returns the number of microseconds since the Arduino board started running the current program.
- delay(ms): Pauses the program for a specified number of milliseconds.
- delayMicroseconds(us): Pauses the program for a specified number of microseconds.
- Serial.begin(baudRate): Initializes the serial communication at the specified baud rate.
- Serial.print(data):

## Serial Monitor
The Serial Monitor in Arduino is a built-in tool within the Arduino IDE (Integrated Development Environment) that allows you to communicate with your Arduino board through a serial connection. It is used for sending and receiving text-based data between your computer and the Arduino board via the USB cable.

The Serial Monitor is helpful for debugging your Arduino code, displaying sensor readings, or receiving user inputs. It can display data received from the Arduino as well as send data to the Arduino.

To use the Serial Monitor, you need to include Serial communication functions in your Arduino code. Some common Serial functions include:
- Serial.begin(baudRate): Initializes the Serial communication at the specified baud rate (e.g., 9600 bits per second).
- Serial.print(data): Prints data to the Serial Monitor without moving to a new line.
- Serial.println(data): Prints data to the Serial Monitor followed by a newline character, moving to a new line.
- Serial.available(): Returns the number of bytes available for reading in the Serial buffer.
- Serial.read(): Reads the oldest byte of incoming data in the Serial buffer and removes it from the buffer.

# Git

## Common Commands
- git init: Initializes a new Git repository in the current directory.
- git clone <repository>: Creates a copy of a remote repository on your local machine.
- git add <file(s)>: Adds file(s) to the staging area, preparing them for a commit.
- git commit -m "<message>": Commits the staged changes to the repository with a descriptive message.
- git status: Shows the status of your working directory, including modified, staged, and untracked files.
- git diff: Shows differences between the working directory and the latest commit.
- git log: Displays a log of all commits in the repository.
- git remote add <name> <url>: Adds a remote repository to your local repository with a reference name.
- git fetch <remote>: Fetches changes from a remote repository but does not merge them.
- git pull <remote>: Fetches changes from a remote repository and merges them into the current branch.
- git push <remote> <branch>: Pushes your local commits to the specified remote repository and branch.
- git branch: Lists all branches in the repository and shows the current branch.

## Git Merging
Merging in Git is the process of combining two branches. If you have a main branch and a feature branch, and you have completed implementing your new updates in the feature branch, you can merge it into the main branch using the following Git commands:

- Switch to the main branch using the command: `git checkout main`
- Merge the feature branch into the main branch using the command: `git merge feature`  

This will merge the feature branch into the main branch without affecting the feature branch itself.  

On the other hand, if you are working on a feature branch and the main branch is updated with new changes, it is recommended to merge the main branch into your feature branch. To achieve this, switch to the feature branch and enter the command: `git merge main`. This will merge the new updates in main into the feature branch you are working on, without affecting the main branch. It is a good practice to perform this operation whenever the main branch is updated, as it helps to minimize merge conflicts.
  
## Git Rules
1. Don't commit directly to master  
2. Don't merge your own commits  
