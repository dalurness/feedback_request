from flask import Flask, make_response
from flask import request
from flask.helpers import get_debug_flag
from sqlalchemy.sql.expression import distinct
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

app = Flask(__name__)
app.config['FLASK_ENV'] = 'development'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
CORS(app)

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    email = db.Column(db.String(256))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(6))
    country = db.Column(db.String(20))
    rating = db.Column(db.Integer)
    improvements = db.Column(db.Text)

    def __repr__(self):
        return '<Feedback %r>' % self.name

    @property
    def serialize(self):
        """Return serialized dict"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'age': self.age,
            'gender': self.gender,
            'country': self.country,
            'rating': self.rating,
            'improvements': self.improvements   
        }

@app.route('/feedback', methods=['GET', 'POST'])
def addfeedback():
    if request.method == "POST":
        data = request.get_json(force=True)

        try:
            new_feedback = Feedback(**data)
            db.session.add(new_feedback)
            db.session.commit()
        except Exception as e:
            return ({"message": "Unable to save feedback"}, 500)

        return ({}, 201)
    else:
        try:
            feedback_list = Feedback.query.all()
            feedback_list = [f.serialize for f in feedback_list]
            return ({"feedback_list": feedback_list}, 200)
        except Exception as e:
            return ({"message": "failed to get feedback"}, 500)

@app.route('/marketing', methods=['GET'])
def getmarketing():
    try:
        val = db.session.query(
            func.avg(Feedback.age).label("avg_age"),
            func.avg(Feedback.rating).label("avg_rating"),
            func.count(Feedback.id).label("num_responses")
        ).all()
        gender_count = db.session.query(Feedback.gender, func.count(Feedback.gender).label('gender_count')).group_by(Feedback.gender).all()
        gender_count = {g[0]: g[1] for g in gender_count}
        country_count = db.session.query(Feedback.country, func.count(distinct(Feedback.id)).label('country_count')).group_by(Feedback.country).all()
        country_count = {g[0]: g[1] for g in country_count}
        return (
            {
                'avg_age': val[0][0],
                'avg_rating': val[0][1],
                'num_responses': val[0][2],
                'gender_count': gender_count,
                'country_count': country_count
            },
            200
        )
    except Exception as e:
        print(e)
        return ({"message": "failed to get marketing data"}, 500)

                