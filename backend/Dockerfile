# docker run -d -p 5000:5000 -v $(pwm):/usr/src/app --privileged --rm backend

FROM arm32v7/python:3.12.0a4-bullseye

WORKDIR /usr/src/app

# Get circuit python https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi
RUN pip install --upgrade adafruit-python-shell
RUN pip install Adafruit_DHT --install-option="--force-pi"

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

CMD [ "python", "./app.py" ]