
from app import app,db
from flask import jsonify, request , render_template
from serializers import serialize_data
from models import Data  

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
        

