NAME := main
HEX := $(NAME).hex
OUT := $(NAME).out
MAP := $(NAME).map
SOURCES := $(wildcard *.cpp)
HEADERS := $(wildcard *.h)
OBJECTS := $(patsubst %.cpp,%.o,$(SOURCES))

MCU := atmega2560
MCU_AVRDUDE := m2560
PARTNO := stk500v2
DEVICE := /dev/ttyACM0
BAUDRATE := 115200
AVRDUDE_FLAGS := -F -V -D -v

CC := avr-g++
OBJCOPY := avr-objcopy
SIZE := avr-size -A

CFLAGS := -Wall -pedantic -I/usr/share/arduino/hardware/archlinux-arduino/avr/variants/mega/ -I/usr/share/arduino/hardware/archlinux-arduino/avr/cores/arduino/ -mmcu=$(MCU) -g -Os -DF_CPU=16000000UL

all: $(HEX)

clean:
	rm -f $(HEX) $(OUT) $(MAP) $(OBJECTS)

flash: $(HEX)
	avrdude $(AVRDUDE_FLAGS) -c $(PARTNO) -p $(MCU_AVRDUDE) -P $(DEVICE) -b $(BAUDRATE) -U flash:w:$(HEX)

$(HEX): $(OUT)
	$(OBJCOPY) -R .eeprom -O ihex $< $@

$(OUT): $(OBJECTS)
	$(CC) $(CFLAGS) -o $@ -Wl,-Map,$(MAP) $^
	@echo
	@$(SIZE) $@
	@echo

%.o: %.cpp $(HEADERS)
	$(CC) $(CFLAGS) -c -o $@ $<

%.pp: %.cpp
	$(CC) $(CFLAGS) -E -o $@ $<

%.ppo: %.cpp
	$(CC) $(CFLAGS) -E $<
