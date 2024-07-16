
from app import app,db
from flask import jsonify, request
from serializers import serialize_data
from models import Data  # Adjust this import path according to your project structure

@app.route('/')
def home():
    return "Hello, Flask!"


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
            return jsonify({'message': 'The complaint registered successfully', 'data': serialized_data}), 201
        else:
            return jsonify({'error': 'The complaint registration failed'}), 500

    except (ValueError) as e:
        return jsonify({"error ": str(e)}), 400
    except Exception as e:
        return jsonify({"error   ": str(e)}), 500
    


@app.route('/get_all', methods=['GET'])
def get_all():
    try:
      #  db.data.drop()
        if request.method == 'GET':
         condition = {"status": {"$ne": "close"}}
         data = db.data.find(condition)
         data_list = list(data)
         return jsonify(data_list)
    except Exception as e:
        return str(e)

