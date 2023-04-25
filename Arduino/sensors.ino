#include "DHT.h"

//Temperature Sensor: 3.3 Volt
#define DHTPIN 7
#define DHPTYPE DHT11

DHT dht(DHTPIN, DHPTYPE);

//Water Sensor: 3.3 Volt
#define POWER_PIN 2
#define WATER_LEVEL_PIN A1


//UV Sensor: 3.3 Volt
int UVintensityPin = A0;

void setup() {
  Serial.begin(9600);
  while(!Serial){}
  //Water Sensor
  pinMode(POWER_PIN, OUTPUT);
  digitalWrite(POWER_PIN, LOW);
  //Temperature Sensor
  dht.begin();
  //UV Sensor
  pinMode(UVintensityPin, INPUT);
  Serial.println("Start");

  readMessageFromRaspberryPi();
}

void loop() {
  int waterLevel = readWaterSensor();
  float celsius = readTemperature();
  Serial.print("Water level: ");
  Serial.println(waterLevel);
  Serial.print("Temperature: ");
  Serial.print(celsius);
  Serial.println("°C");
  readUVSensor();
  Serial.println("---------------------\n");
  delay(5000);
}

void readMessageFromRaspberryPi(){
  if(Serial.available() > 0){
    String message = Serial.readStringUntil('\n');
    Serial.println(message);
  }
}

int readWaterSensor() {
	digitalWrite(POWER_PIN, HIGH);  // turn the sensor ON
  delay(100);                      // wait 10 milliseconds
  int value = averageAnalogRead(WATER_LEVEL_PIN); // read the analog value from sensor
  digitalWrite(POWER_PIN, LOW);   // turn the sensor OFF
  return value;
}

//Returns temperature in Celsius
int readTemperature() {
	return dht.readTemperature();
}

void readUVSensor() {
	int uvLevel = averageAnalogRead(UVintensityPin); 
 
	float outputVoltage = 5.0 * uvLevel/1024; 
	float uvIntensity = mapfloat(outputVoltage, 0.99, 2.9, 0.0, 15.0); 

  /*
	Serial.print("UVAnalogOutput: "); 
	Serial.println(uvLevel); 

	Serial.print("OutputVoltage: "); 
	Serial.println(outputVoltage); 
  */

	Serial.print("UV Intensity: "); 
	Serial.print(uvIntensity); 
	Serial.println(" mW/cm^2");
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