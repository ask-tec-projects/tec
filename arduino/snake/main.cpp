#include "Arduino.h"
#include "avr/io.h"

#define LED_ADDR 13
#define INTERVAL 50

void setup() { pinMode(LED_ADDR, OUTPUT); }

void loop() {
    digitalWrite(LED_ADDR, HIGH);
    _delay_ms(INTERVAL);
    digitalWrite(LED_ADDR, LOW);
    _delay_ms(INTERVAL);
}

int main(void) {
    setup();
    for (;;) {
        loop();
    }
}
