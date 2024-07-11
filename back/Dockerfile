FROM python:3.10-slim

ENV PYTHONPATH=/app
ENV USR=root
ENV pwd=pass123
WORKDIR /app

COPY requirements.txt requirements.txt

USER root
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /app/

EXPOSE 8700

CMD ["python", "app/main.py"]
