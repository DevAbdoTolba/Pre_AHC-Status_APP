from models import Data
from datetime import datetime
import re

class SerializationError(Exception):
    pass

class DeserializationError(Exception):
    pass

def serialize_data(data_model):
    if not isinstance(data_model, Data):
        raise TypeError("Input is not a Data model instance.")
   
    try:
        data_dict = data_model.to_dict()
        create_date = datetime.strptime(data_dict["createDate"], "%Y-%m-%dT%H:%M:%S").date()

        if not data_dict['name'] or data_dict['name'].strip() == "":
            raise SerializationError("Name field cannot be empty.")
        
        if len(data_dict['name']) >= 50:
            raise SerializationError("Name field cannot exceed 50 characters.")
        
        if not re.match(r"^[a-zA-Z\u0600-\u06FF\s]*$", data_dict['name']):
            raise SerializationError("Name field can only contain letters and spaces.")
        
        if data_dict['age'] and datetime.fromisoformat(data_dict['age']).date() > datetime.now().date():
            raise SerializationError("Age cannot be in the future.")
        
        if data_dict["level"] not in ("easy", "normal", "hard"):
            raise SerializationError("Invalid value for field: level.")
        
        if not data_dict["msg"] or data_dict["msg"].strip() == "":
            raise SerializationError("Message field cannot be empty.")
        
        if len(data_dict['msg']) >= 500:
            raise SerializationError("Message field cannot exceed 500 characters.")
                
        if data_dict["important"] not in (True, False):
            raise SerializationError("Invalid value for field: important.")

        if data_dict["status"] not in ("open" , "close"):

            raise SerializationError("Invalid value for field: status.")
        
        if data_dict["status"] == "open" and data_dict["closeDate"]:
            raise SerializationError("opened complaints can't have close date .")
        
        if data_dict["status"] == "close" and  data_dict["closeDate"]== None:
            raise SerializationError("closed complaints must have close date.")
        
        if data_dict["status"] == "close" and data_dict["closeDate"]!= None:
            if data_dict["closeDate"] < data_dict["createDate"] :
                raise SerializationError("close date can't be before create date.")
        if data_dict["status"] == 'open'and data_dict["createDate"]== None:
                raise SerializationError(" complaints must have create date  .")
        
        if create_date and datetime.fromisoformat(str(create_date)).date() > datetime.now().date():
                raise SerializationError("Create date cannot be in the future.")
        
            
        
        return data_dict
    except Exception as e:
        raise SerializationError(f"{e}")

def deserialize_data(data):
    if not isinstance(data, dict):
        raise DeserializationError("Input is not a dictionary.")
    
    try:
        if 'name' not in data or not data['name']:
            raise DeserializationError("Missing required field: name.")
        
        if len(data['name']) >= 50:
            raise DeserializationError("Name field cannot exceed 50 characters.")
        
        if not re.match(r"^[a-zA-Z\u0600-\u06FF\s]*$", data['name']):
            raise DeserializationError("Name field can only contain letters and spaces.")
        
        if 'age' in data and data['age']:
            try:
                datetime.fromisoformat(data['age']).date()
            except ValueError:
                raise DeserializationError("Invalid date format for field: age.")
            
        if 'level' in data and data['level'] not in ("easy", "normal", "hard"):
            raise DeserializationError("Invalid value for field: level.")
        
        if 'msg' not in data or not data['msg']:
            raise DeserializationError("Missing required field: msg.")
        
        if len(data['msg']) >= 500:
            raise DeserializationError("Message field cannot exceed 500 characters.")
        
        if 'important' in data and data['important'] not in (True, False):
            raise DeserializationError("Invalid value for field: important.")
        
        if 'status' in data and data['status'] not in ("open", "close"):
            raise DeserializationError("Invalid value for field: status.")
        
        data_model = Data.from_dict(data)
        return data_model
    except Exception as e:
        raise DeserializationError(f"{e}")
