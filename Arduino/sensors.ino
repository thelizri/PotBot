#include "DHT.h"

//Temperature Sensor
#define DHTPIN 7
#define DHPTYPE DHT11

DHT dht(DHTPIN, DHPTYPE);

//Water Sensor
#define POWER_PIN  6
#define SIGNAL_PIN A1


int TemperaturePin = 7;
int UVintensityPin = A0;

void setup() {
  Serial.begin(9600);
  //Water Sensor
  pinMode(POWER_PIN, OUTPUT);
  digitalWrite(POWER_PIN, LOW);
  //Temperature Sensor
  dht.begin();
  //UV Sensor
  pinMode(ReadUVintensityPin, INPUT);
}

int readWaterSensor() {
	digitalWrite(POWER_PIN, HIGH);  // turn the sensor ON
  	delay(10);                      // wait 10 milliseconds
  	value = analogRead(SIGNAL_PIN); // read the analog value from sensor
  	digitalWrite(POWER_PIN, LOW);   // turn the sensor OFF
  	return value;
}

//Returns temperature in Celsius
int readTemperature() {
	return dht.readTemperature();
}

int readUVSensor() {
	int uvLevel = averageAnalogRead(ReadUVintensityPin); 
 
	float outputVoltage = 5.0 * uvLevel/1024; 
	float uvIntensity = mapfloat(outputVoltage, 0.99, 2.9, 0.0, 15.0); 

	Serial.print("UVAnalogOutput: "); 
	Serial.print(uvLevel); 

	Serial.print(" OutputVoltage: "); 
	Serial.print(outputVoltage); 

	Serial.print(" UV Intensity: "); 
	Serial.print(uvIntensity); 
	Serial.print(" mW/cm^2");
}

//Takes an average of readings on a given pin 
//Returns the average 
int averageAnalogRead(int pinToRead) 
{ 
  byte numberOfReadings = 8; 
  unsigned int runningValue = 0;  
 
  for(int x = 0 ; x < numberOfReadings ; x++)
  runningValue += analogRead(pinToRead); 
  runningValue /= numberOfReadings; 
 
  return(runningValue);   
 
} 

//The Arduino Map function but for floats 
//From: http://forum.arduino.cc/index.php?topic=3922.0 
float mapfloat(float x, float in_min, float in_max, float out_min, float out_max) 
{ 
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min; 
} 