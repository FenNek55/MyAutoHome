import time
from sensors import pms5003_1, dht22
from database.database import insert_pms_reading, get_pms_readings, insert_dht_reading, get_dht_readings
from multiprocessing import Process
from flask import Flask, Response
from database.database import insert_pms_reading, get_pms_readings
import json

class SensorsRunner:
    def __init__(self, sleep_time) -> None:
        self.sleep_time = sleep_time

    def get_pms_data(self):
        try:
            data = pms5003_1.read()
            pm1 = data.pm_ug_per_m3(1)
            pm25 = data.pm_ug_per_m3(2.5)
            pm10 = data.pm_ug_per_m3(10)
            print(pm1)
            print(pm25)
            print(pm10)
            insert_pms_reading(pm1, pm25, pm10)
        except:
            print("Failed getting data from air sensor")

    def get_dht_data(self):
        try:
            temperature = dht22.temperature
            humidity = dht22.humidity

            insert_dht_reading(temperature, humidity)
        except:
            print("Failed getting data from dht22")

    def tick(self):
        self.get_pms_data()
        self.get_dht_data()


def process_task():
    runner = SensorsRunner(600)

    while True:
        runner.tick()
        time.sleep(runner.sleep_time)

app = Flask(__name__)

@app.route("/pms")
def entries():
    pms_entries = get_pms_readings(1000)
    formatted = []

    for entry in pms_entries:
        formatted_entry = {
            'id': entry[0],
            'timestamp': entry[1],
            'pm1': entry[2],
            'pm25': entry[3],
            'pm10': entry[4]
        }
        formatted.append(formatted_entry)

    resp = Response(json.dumps(formatted, indent=4))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Content-Type'] = 'application/json'

    return resp

@app.route("/dht")
def dht_entries():
    dht_entries = get_dht_readings(1000)
    formatted = []

    for entry in dht_entries:
        formatted_entry = {
            'id': entry[0],
            'timestamp': entry[1],
            'temperature': entry[2],
            'humidity': entry[3],
        }
        formatted.append(formatted_entry)

    resp = Response(json.dumps(formatted, indent=4))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Content-Type'] = 'application/json'

    return resp

@app.route("/")
def test():
    resp = Response("WorksTest")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

if __name__ == "__main__":
    proc = Process(target=process_task)
    proc.start()
    app.run(host="0.0.0.0")