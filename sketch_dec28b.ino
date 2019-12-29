#include <Keyboard.h>

const int Button_0 = 0;
const int Button_1 = 1;
const int Button_2 = 2;
const int Button_3 = 3;

void setup()
{
  pinMode(Button_0, INPUT);
  pinMode(Button_1, INPUT);
  pinMode(Button_2, INPUT);
  pinMode(Button_3, INPUT);
  Serial.begin(9600); //
  Keyboard.begin();
}
void loop()
{
      int val_0;
      int val_1;
      int val_2;
      int val_3;
      val_0=analogRead(Button_0);//Connect the sensor to analog pin 0
      val_1=analogRead(Button_1);//Connect the sensor to analog pin 0
      val_2=analogRead(Button_2);//Connect the sensor to analog pin 0
      val_3=analogRead(Button_3);//Connect the sensor to analog pin 0
      Serial.print("Val_0:");//
      Serial.println(val_0,DEC);//
      Serial.print("Val_1:");//
      Serial.println(val_1,DEC);//
      Serial.print("Val_2:");//
      Serial.println(val_2,DEC);//
      Serial.print("Val_3:");//
      Serial.println(val_3,DEC);//
      delay(10);
  if (analogRead(Button_0) <10) {
    Keyboard.write('k');
  }
  if (analogRead(Button_1) <10) {
    Keyboard.write('j');
  }
  if (analogRead(Button_2)  <10) {
    Keyboard.write('f');
  }
  if (analogRead(Button_3)  <10) {
    Keyboard.write('d');
  }


/*
dddddddddddddddffffffffjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
*/
}
