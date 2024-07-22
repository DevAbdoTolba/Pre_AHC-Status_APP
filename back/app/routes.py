
from datetime import datetime, date,timedelta
from app import app,db
from flask import jsonify, request , render_template
from serializers import serialize_data
from models import Data  
import base64
import json
import os


@app.route('/')
def home():
    return "hello world from flask :)"

@app.route('/create', methods=['POST'])
def create():
    try:
        if not request.json:
            return jsonify({'error': 'No data provided'}), 400

        data = request.json

        
        required_fields = ['name', 'age', 'level', 'msg']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({'error': f'Missing fields: {", ".join(missing_fields)}'}), 400

        
        data_model = Data(name=data['name'], age=data['age'], level=data['level'], msg=data['msg'])
        serialized_data = serialize_data(data_model)
        

        result = db.data.insert_one(serialized_data)
        if result.inserted_id:
            return jsonify({'message': 'The complaint registered successfully'}), 201
        else:
            return jsonify({'error': 'An error occurred'}), 500
        
    except (ValueError) as e:
        return jsonify({"error ": str(e)}), 400
    except Exception as e:
        return jsonify({"error   ": str(e)}), 500
    


@app.route('/get_all', methods=['GET'])
def get_all():

        try:
                if request.method == 'GET':
                        condition = {"status": {"$ne": "close"}}
                        projection = {"createDate": 0, "closeDate": 0}
                        data = db.data.find(condition, projection)
                        data_list = list(data)
                        return jsonify(data_list)
        except Exception as e:
                return str(e)


@app.route('/get_status/<status>', methods=['GET'])
def get_status(status):
        try:
                if request.method == 'GET':
                        if status != "open" and status != "close":
                                return jsonify({'error': 'Invalid status , status should be only : "open" or "close" '}), 400  #bad request
                        condition = {"status": status}
                        projection = {"createDate": 0, "closeDate": 0}
                        data = db.data.find(condition, projection)
                        data_list = list(data)
                        return jsonify(data_list)
        except Exception as e:
                return str(e)


@app.route('/get_level/<level>', methods=['GET'])
def get_level(level):
        try:
                if request.method == 'GET':
                        if level != "easy" and level != "normal" and level != "hard":
                                return jsonify({'error': 'Invalid level , level should be only : "easy" or "normal" or "hard" '}), 400 
                        condition = {"level": level}
                        projection = {"createDate": 0, "closeDate": 0}
                        data = db.data.find(condition, projection)
                        data_list = list(data)
                        return jsonify(data_list)
        except Exception as e:
                return str(e)


@app.route('/get/<id>', methods=['GET'])
def get(id):
        try:
                if request.method == 'GET':
                        if not db.data.find_one({"_id": id}):
                                return jsonify({'error': 'Invalid id'}), 400
                        condition = {"_id": id}
                        projection = {"createDate": 0, "closeDate": 0}
                        data = db.data.find_one(condition, projection)
                        return jsonify(data)
        except Exception as e:
                return str(e)

@app.route('/get_important', methods=['GET'])
def get_important():
        try:
                if request.method == 'GET':
                        condition = {"important": True}
                        projection = {"createDate": 0, "closeDate": 0}
                        data = db.data.find(condition, projection)
                        data_list = list(data)
                        return jsonify(data_list)
        except Exception as e:
                return str(e)

@app.route('/delete/<id>', methods=['DELETE'])
def delete(id):
        try:
                if request.method == 'DELETE':
                        if not db.data.find_one({"_id": id}):
                                return jsonify({'error': 'Invalid id'}), 400
                        condition = {"_id": id}
                        db.data.delete_one(condition)
                        return jsonify({'message': 'The complaint deleted successfully'})
        except Exception as e:
                return str(e)

# minioooooo on fire 
@app.route('/delete_all', methods=['DELETE'])
def delete_all():
        try:
                if request.method == 'DELETE':
                        if JSON_GET_P is None or JSON_GET_P == "":
                                        return jsonify({'error': 'try again after 24 days'}), 400
                
                        encodepass = JSON_GET_P.encode() 

                        decoded_pass = base64.b64decode(encodepass)
                        
                        password = decoded_pass.decode("utf-8")

                        if password != db.secret.find()[0].get("password"):
                                return jsonify({'error': 'Invalid password'}), 400
                        data = db.data.find({})
                        data_list = list(data)
                        backup_dir = ".backup"
                        if not os.path.exists(backup_dir):
                                os.makedirs(backup_dir)

       
                        i = 1
                        while os.path.exists(os.path.join(backup_dir, f"bk{i}.json")):
                          i += 1

                        file_path = os.path.join(backup_dir, f"bk{i}.json")
                        json.dump(data_list, f)                        
                        db.data.drop()
                        return jsonify({'message': 'All complaints deleted successfully'})
        except base64.binascii.Error:
                        return jsonify({'error': 'try again after 24 days'}), 400        
        except Exception as e:
               return jsonify({'error': 'something went wrong '}), 500       
        
        
        
@app.route('/stats', methods = ['GET'])
def data_visualization():
    try:
        stats = Data.get_statistics()
        # print(stats)
        avg_age = stats.get("avg_age")
        if avg_age is None:
            avg_age = 0

        level_distribution = stats.get("level_distribution")
        easy = level_distribution["easy"]
        normal = level_distribution["normal"]
        hard = level_distribution["hard"]
        if easy[0] is None:
                easy[0] = 0
        if easy[1] is None:
                easy[1] = 0

        if normal[0] is None:
                normal[0] = 0
        if normal[1] is None:
                normal[1] = 0

        if hard[0] is None:
                hard[0] = 0
        if hard[1] is None:
                hard[1] = 0
        level_distribution = [[easy[0],easy[1]],[normal[0],normal[1]],[hard[0],hard[1]]]
        important_frequency = stats.get("important_frequency")
        true = important_frequency[True]
        false = important_frequency[False]
        no_complaint = true+false
        
        if true is None:
                true = 0
        if false is None:
                false = 0
        important_frequency = [true,false]

        status_frequency = stats.get("status_frequency")
        open = status_frequency["open"]
        close = status_frequency["close"]
        if open is None:
                open = 0
        if close is None:
                close = 0
        status_frequency = [open,close]
        
        common_words_in_msg = stats.get("common_words")
        if len(common_words_in_msg) >= 10:
                common_words_in_msg = sorted(common_words_in_msg, key=lambda x: x[1], reverse=True)[:10]
        else:
                common_words_in_msg = sorted(common_words_in_msg, key=lambda x: x[1], reverse=True)[:10]
                while (len(common_words_in_msg)<10):
                        common_words_in_msg.append(("",0))
        

        return render_template('index.html',avg_age = avg_age , level_distribution = level_distribution , important_frequency = important_frequency,
        status_frequency= status_frequency,common_words_in_msg= common_words_in_msg,no_complaint=no_complaint)

    except Exception as e:
        return render_template("data_visualization.html",ms = str(e)+"500")
        

@app.route('/update_status/<id>',methods=["PATCH"])
def update_status(id):
        try:
            if not request.method == 'PATCH':
                return jsonify({'error': 'This endpoint is intended only for PATCH method'}), 405
            if not request.json or not "status" in request.json:
                return jsonify({'error': 'No data provided'}), 400
            if not ( data:= db.data.find_one({"_id": id})):
                return jsonify({'error': 'Invalid id'}), 400
            
            if(data["status"] == "close" and request.json["status"] == "close"):
                return jsonify({'warning': 'status is already set to "close"'}), 202
            
            if(data["status"] == "open" and request.json["status"] == "open"):
                return jsonify({'warning': 'status is already set to "open"'}), 202
                   
            if(request.json["status"] == "close"):
                now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
                db.data.update_one({"_id":id},{"$set":{"status":"close","closeDate":now}})
            elif(request.json["status"] == "open"):
                db.data.update_one({"_id":id},{"$set":{"status":"open","closeDate":None}})
            else:
                return jsonify({'error': 'status can either be "close" or "open"'}), 400
                     
            return jsonify({'message': 'Status updated successfully'})
        except Exception as e:
            return str(e)


@app.route('/update_important/<id>',methods=["PATCH"])
def update_important(id):
        try:
            if not request.method == 'PATCH':
                return jsonify({'error': 'This endpoint is intended only for PATCH method'}), 405
            if not request.json or not "important" in request.json:
                return jsonify({'error': 'No data provided'}), 400
            
            if not (data:= db.data.find_one({"_id": id})):
                return jsonify({'error': 'Invalid id'}), 400
            
            if(data["important"] == True and request.json["important"] == True):
                return jsonify({'warning': 'status is already set to True'}), 202
            
            if(data["important"] == False and request.json["important"] == False):
                return jsonify({'warning': 'status is already set to False'}), 202

            if(request.json["important"] == True):
                db.data.update_one({"_id":id},{"$set":{"important":True}})
            elif(request.json["important"] == False):
                db.data.update_one({"_id":id},{"$set":{"important":False}})
            else:
                return jsonify({'error': 'important status can either be True or False'}), 400
                   
            return jsonify({'message': 'important status updated successfully'})
        except Exception as e:
            return str(e)
