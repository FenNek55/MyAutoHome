# docker run -d -p 5000:5000 -v $(pwm):/usr/src/app --privileged --rm backend

FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

CMD [ "python", "./app.py" ]