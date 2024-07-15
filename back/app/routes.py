
from app import app,db 
from flask import jsonify, request


@app.route('/')
def home():
    return "Hello, Flask!"


@app.route('/create',methods = ['POST'])
def create():
        try:
            data = request.json()
            # result = db.data.insert_one(data)
            # if result.inserted_id:
            #     return jsonify(val_msg = "the Complain registered successfully"),201
            # else:
            #     return jsonify(val_msg = "the compain registered faild"),500
        except (ValueError) as e:
            return jsonify({"error ":str(e)}),400
        except Exception as e:
            return jsonify({"error   ":str(e)}),500
    


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

