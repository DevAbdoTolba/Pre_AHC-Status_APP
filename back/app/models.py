from bson import ObjectId
from datetime import datetime, date
from collections import defaultdict
from app import db
import string
import re


class Data:
    def __init__(self, name, age=None, level=None, msg=None, important=False, status=None, _id=None):
        try:
            self.id = _id if _id else ObjectId()
            self.name = name
            if isinstance(age, str):
                self.age = datetime.strptime(age, "%Y-%m-%d").date()
            elif isinstance(age, date):
                self.age = age
            else:
                self.age = datetime.now().date()

            self.level = level
            self.msg = msg
            self.important = important
            self.status = status if status is not None else "open"
        except Exception as e:
            raise ValueError(f"Error initializing Data object: {e}")

    def to_dict(self):
         try:
            return {
                "_id": str(self.id),
                "name": self.name,
                "age": self.age.isoformat() if self.age else None,
                "level": self.level,
                "msg": self.msg,
                "important": self.important,
                "status": self.status
            }
         except Exception as e:
            raise ValueError(f"Error converting Data object to dict: {e}")

    @classmethod
    def from_dict(cls, data):
        try:
            name = data.get("name")
            if not name:
                raise ValueError("Missing required field: name")

            age = data.get("age")
            if age:
                age = datetime.fromisoformat(age).date()

            level = data.get("level")
            if level and level not in ("easy", "normal", "hard"):
                raise ValueError("Invalid value for field: level")

            msg = data.get("msg")
            important = data.get("important", False)

            status = data.get("status", "open")
          
            _id = data.get("_id")
            if _id:
                _id = ObjectId(_id)

            return cls(name=name, age=age, level=level, msg=msg, important=important, status=status, _id=_id)
        except Exception as e:
            raise ValueError(f"Error creating Data object from dict: {e}")
        
    @staticmethod
    def get_statistics():
        all_records = db.data.find({})
        records_len = len(list(all_records.clone()))
        avg_age=0
        level_distribution={
            "easy": 0,
            "normal": 0,
            "hard": 0
            }
        level_distribution_total = 0
        important_frequency = {True:0,False:0}
        status_frequency = {"open":0,"closed":0}
        common_words = defaultdict(int)

        for record in all_records:
            #calculate avg_age    
            a = datetime.strptime(record['age'], "%Y-%m-%d").date()
            b = datetime.now().date()
            delta = b - a
            avg_age += delta.days

            #calculate level_distribution
            level_distribution[record['level']] +=1
            level_distribution_total +=1

            #calculate important_frequency
            important_frequency[record['important']] +=1

            #calculate status_frequency
            status_frequency[record['status']] +=1

            #calculate common_words
            message = str(record['msg'])
            message.translate(str.maketrans('', '', string.punctuation)) #remove all punctuation
            re.sub(' +', ' ', message) # remove multiple spaces e.g 'The   fox jumped   over    the log.'

            for word in message.split():
                common_words[word.title()] +=1

        #safe gurad to prevent division by zero
        records_len = max(records_len,1)
        level_distribution_total = max(level_distribution_total,1)

        #calculating percentages
        avg_age *= 100/records_len
        avg_age = round(avg_age,1)

        level_distribution["easy"] *= (100 / level_distribution_total)
        level_distribution["easy"] = round(level_distribution["easy"],1)

        level_distribution["normal"] *= (100 / level_distribution_total)
        level_distribution["normal"] = round(level_distribution["normal"],1)

        level_distribution["hard"] *= (100 / level_distribution_total)
        level_distribution["hard"] = round(level_distribution["hard"],1)


        stat = {
            "avg_age" : avg_age,
            "level_distribution": level_distribution,
            "important_frequency": important_frequency,
            "status_frequency" : status_frequency,
            "common_words": list(common_words.items())
        }


        return stat



