
from app import app,db 
from flask import jsonify, request


@app.route('/')
def home():
    return "Hello, Flask!"


@app.route('/create',methods = ['POST'])
def create():
        try:
            data = request.get_json()
            name = data["name"]
            age  = data["age"]
            level= data["level"]
            msg  = data["msg"]
            # # عشان اتأكد ان الداتا اللى واصلانى وصلانى صح 
            # if name is None or name =="" or not isinstance(name, str):
            #     return ValueError('Invalid "name" field')
            # if age is None or not isinstance(age, data):
            #     return ValueError('Invalid "age" field')
            # if level is None or not level in ["easy","normal","hard"]:
            #     return ValueError('Invalid "level" field')
            # if msg is None or msg == "" or not isinstance(msg, str):
            #     return ValueError('Invalid "msg" field')
            # # if important is None or not important in ["true","false"]:
            # #     return ValueError('Invalid "important" field')
            # # if status is None or not status in ["open","close"]:
            # #     return ValueError('Invalid "status" field')
            result = db.data.insert_one(data)
            if result.inserted_id:
                return jsonify(val_msg = "the Complain registered successfully"),201
            else:
                return jsonify(val_msg = "the compain registered faild"),500
        # معناها ان الخطا حصل ف البيانات اللى حاية
        except (ValueError) as e:
            return jsonify({"error ":str(e)}),400
        # معناها ان الخطا حصل ف السيرفير نفسه
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

