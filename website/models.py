from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Skill(db.Model):
    __tablename__ = "skills"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    percent = db.Column(db.Integer, unique=False)

    def __init__(self, name="", percent=0):
        self.name = name
        self.percent = percent

    def __repr__(self):
        return "<Skill [{}%] {}".format(self.percent, self.name)
