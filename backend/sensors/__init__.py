#!/usr/bin/env python

from pms5003 import PMS5003

print("""all.py - Continously print all data values.
Press Ctrl+C to exit!
""")

pms5003_1 = PMS5003(
    device='/dev/ttyUSB0',
    baudrate=9600,
    pin_enable=22,
    pin_reset=27
)