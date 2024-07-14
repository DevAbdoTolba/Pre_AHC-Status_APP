from bson import ObjectId
from datetime import datetime
from app import db

class Data:
    def __init__(self, name, age=None, level=None, msg=None, important=False, _id=None):
        self.id = _id if _id else ObjectId()
        self.name = name
        self.age = age if age else datetime.now()
        self.level = level
        self.msg = msg
        self.important = important

    def to_dict(self):
        return {
            "_id": str(self.id),
            "name": self.name,
            "age": self.age.isoformat() if self.age else None,
            "level": self.level,
            "msg": self.msg,
            "important": self.important
        }

    @classmethod
    def from_dict(cls, data):
        name = data.get("name")
        if not name:
            raise ValueError("Missing required field: name")
        
        age = data.get("age")
        if age:
            age = datetime.fromisoformat(age)
        
        level = data.get("level")
        if level and level not in ("easy", "normal", "hard"):
            raise ValueError("Invalid value for field: level")
        
        msg = data.get("msg")
        important = data.get("important", False)
        _id = data.get("_id")
        if _id:
            _id = ObjectId(_id)
        
        return cls(name=name, age=age, level=level, msg=msg, important=important, _id=_id)
        
    def save(self):
        db.data.insert_one(self.to_dict())
