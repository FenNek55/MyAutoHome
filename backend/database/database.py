from time import time
import sqlite3

def insert_pms_reading(pm1, pm25, pm10):
    con = sqlite3.connect("./database/database.db")
    cur = con.cursor()
    timestamp = int(time())
    cur.execute(f"INSERT INTO pms_readings (timestamp, pm1, pm25, pm10) VALUES ({timestamp}, {pm1}, {pm25}, {pm10});")
    con.commit()

def get_pms_readings(number):
    con = sqlite3.connect("./database/database.db")
    cur = con.cursor()
    readings = cur.execute(f"SELECT * FROM pms_readings ORDER BY timestamp DESC LIMIT {number};")
    return readings