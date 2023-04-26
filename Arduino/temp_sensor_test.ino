#include "DHT.h"

#define DHTPIN 7
#define DHPTYPE DHT11

DHT dht(DHTPIN, DHPTYPE);

int temp_pin = 7;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  dht.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.println(dht.readTemperature());
  delay(2000);
}
