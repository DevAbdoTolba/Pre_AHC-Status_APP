from bson import ObjectId
from datetime import datetime, date,timedelta
from math import ceil
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
        all_records = db.data.find({}).sort([("age", 1)])
        avg_age=0
        level_distribution={
            "easy": [0,0],
            "normal": [0,0],
            "hard": [0,0]
            }
                
        stop_words_and_punctuation = [
        ".", ",", "!", "?", ":", ";", "-", "_", "(", ")", "[", "]", "{", "}", "'", "\"", "`", "~", "@", "#", "$", "%", "^", "&", "*", "+", "=", "|", "\\", "/", "<", ">", "the", "there", "he", "she", "have", "has",
        "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this",
        "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as",
        "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over",
        "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own",
        "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now", "d", "ll", "m", "o", "re", "ve", "y", "ain", "aren", "couldn", "didn", "doesn", "hadn", "hasn", "haven", "isn",
        "ma", "mightn", "mustn", "needn", "shan", "shouldn", "wasn", "weren", "won", "wouldn"]

        stop_words_and_punctuation = [x.title() for x in stop_words_and_punctuation]

        level_distribution_total = 0
        important_frequency = {True:0,False:0}
        status_frequency = {"open":0,"closed":0}
        common_words = defaultdict(int)
        all_ages =[]
        for record in all_records:
            all_ages.append(record['age'])  

            #calculate level_distribution
            level_distribution[record['level']][0] +=1
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
                if word.title() not in stop_words_and_punctuation:
                    common_words[word.title()] +=1

        #calculate avg_age  
        for age in all_ages:
            age_1 = datetime.strptime(age, "%Y-%m-%d").date()
            age_2 = datetime.strptime(all_ages[0], "%Y-%m-%d").date() - timedelta(days=1)
            avg_age +=  (age_1- age_2).days
        avg_age = round(avg_age,1)

        #safe gurad to prevent division by zero
        avg_age /= max(1,len(all_ages))
        level_distribution_total = max(level_distribution_total,1)

        #calculating percentages
        level_distribution["easy"][1] = level_distribution["easy"][0] * (100 / level_distribution_total)
        level_distribution["easy"][1] = round(level_distribution["easy"][1],1)

        level_distribution["normal"][1] = level_distribution["normal"][0]* (100 / level_distribution_total)
        level_distribution["normal"][1] = round(level_distribution["normal"][1],1)

        level_distribution["hard"][1] = level_distribution["hard"][0] * (100 / level_distribution_total)
        level_distribution["hard"][1] = round(level_distribution["hard"][1],1)

        # Selecting top 25% most common words
        common_words_sorted = sorted(common_words.items(), key=lambda item: item[1], reverse=True)
        Q1_list = []
        if len(common_words_sorted)>0:
            Q1_index = ceil(0.25 * len(common_words_sorted))
            Q1_element_num = common_words_sorted[Q1_index-1][1]+1
            Q1_list = [x for x in common_words_sorted if x[1]>=Q1_element_num]


        stat = {
            "avg_age" : avg_age,
            "level_distribution": level_distribution,
            "important_frequency": important_frequency,
            "status_frequency" : status_frequency,
            "common_words": Q1_list
        }


        return stat



