from app import app,db 
from flask import jsonify, request

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/get_all', methods=['GET'])
def get_all():
    try:
        if request.method == 'GET':
         condition = {"status": {"$ne": "close"}}
         data = db.data.find(condition)
         data_list = list(data)
         return jsonify(data_list)
    except Exception as e:
        return str(e)
