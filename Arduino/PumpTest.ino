// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin 4 as an output.
  pinMode(4, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  delay(1000);
}

void turnOffPump() {
  digitalWrite(4, HIGH);
}

void turnOnPump() {
  digitalWrite(4, LOW);
}