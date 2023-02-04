#!/usr/bin/env python

from pms5003 import PMS5003
import adafruit_dht
import board

pms5003_1 = PMS5003(
    device='/dev/ttyUSB0',
    baudrate=9600,
    pin_enable=22,
    pin_reset=27
)

dht22 = adafruit_dht.DHT22(board.D4)