import flask

from api import app
from typing import cast
from marshmallow import Schema, fields, post_load, ValidationError
from api.utils.models import load_model
from sklearn.linear_model import LogisticRegression, LinearRegression


class Quiz2Part2InitialForm:
    def __init__(
        self, sex: str, age: int, cp: int, trestbps: float, chol: float, thalach: float
    ):
        self.sex = sex
        self.age = age
        self.cp = cp
        self.trestbps = trestbps
        self.chol = chol
        self.thalach = thalach

    def to_input_values(self):
        return [[self.age, self.cp, self.trestbps, self.chol, self.thalach]]


class Quiz2Part2AdmittedForm(Quiz2Part2InitialForm):
    def __init__(
        self,
        sex: str,
        age: int,
        cp: int,
        trestbps: float,
        chol: float,
        thalach: float,
        fbs: int,
        restecg: int,
        thal: int,
    ):
        self.sex = sex
        self.age = age
        self.cp = cp
        self.trestbps = trestbps
        self.chol = chol
        self.thalach = thalach
        self.fbs = fbs
        self.restecg = restecg
        self.thal = thal

    def to_input_values(self):
        return [
            [
                self.age,
                self.cp,
                self.trestbps,
                self.chol,
                self.thalach,
                self.fbs,
                self.restecg,
                self.thal,
            ]
        ]


class Quiz2Part2InitialFormSchema(Schema):
    sex = fields.Str(required=True)
    age = fields.Int(required=True)
    cp = fields.Int(required=True)
    trestbps = fields.Float(required=True)
    chol = fields.Float(required=True)
    thalach = fields.Float(required=True)

    @post_load
    def make_object(self, data, **kwargs) -> Quiz2Part2InitialForm:
        return Quiz2Part2InitialForm(**data)


class Quiz2Part2AdmittedFormSchema(Quiz2Part2InitialFormSchema):
    fbs = fields.Int(required=True)
    restecg = fields.Int(required=True)
    thal = fields.Int(required=True)

    @post_load
    def make_object(self, data, **kwargs):
        return Quiz2Part2AdmittedForm(**data)


@app.route("/api/v1/quiz-2/part-2/predict/initial", methods=["POST"])
def predict_quiz_2_part_2_initial():
    """
    This function is using the POST method to get the data from the user
    and return the prediction of the smoker classification model.
    """
    json = flask.request.get_json(force=True)
    schema = Quiz2Part2InitialFormSchema()

    if not json:
        return flask.abort(400, "No data was provided")

    try:
        data = schema.load(json)
        parsed_data = cast(Quiz2Part2InitialForm, data)

        # Load the model the initial heart attack classification model
        male_heart_attack_model = cast(
            LogisticRegression, load_model("heart_attack_initial_male_model.pb")
        )

        female_heart_attack_model = cast(
            LogisticRegression, load_model("heart_attack_initial_female_model.pb")
        )

        # Predict the initial heart attack probability
        input_values = parsed_data.to_input_values()

        heart_attack_probs = []

        if parsed_data.sex == "male":
            heart_attack_probs = male_heart_attack_model.predict_proba(input_values)
        else:
            heart_attack_probs = female_heart_attack_model.predict_proba(input_values)

        return {
            "probabilities": {
                "no_heart_attack": heart_attack_probs[0][0],
                "heart_attack": heart_attack_probs[0][1],
            },
        }

    except ValidationError as err:
        return {"errors": err.messages_dict}


@app.route("/api/v1/quiz-2/part-2/predict/admitted", methods=["POST"])
def predict_quiz_2_part_2_admitted():
    """
    This function is using the POST method to get the data from the user
    and return the prediction of the smoker classification model.
    """
    json = flask.request.get_json(force=True)
    schema = Quiz2Part2AdmittedFormSchema()

    if not json:
        return flask.abort(400, "No data was provided")

    try:
        data = schema.load(json)
        parsed_data = cast(Quiz2Part2AdmittedForm, data)

        # Load the model the admitted heart attack classification model
        male_heart_attack_model = cast(
            LogisticRegression, load_model("heart_attack_admitted_male_model.pb")
        )

        female_heart_attack_model = cast(
            LogisticRegression, load_model("heart_attack_admitted_female_model.pb")
        )

        # Predict the admitted heart attack probability
        input_values = parsed_data.to_input_values()

        heart_attack_probs = []

        if parsed_data.sex == "male":
            heart_attack_probs = male_heart_attack_model.predict_proba(input_values)
        else:
            heart_attack_probs = female_heart_attack_model.predict_proba(input_values)

        return {
            "probabilities": {
                "no_heart_attack": heart_attack_probs[0][0],
                "heart_attack": heart_attack_probs[0][1],
            },
        }

    except ValidationError as err:
        return {"errors": err.messages_dict}
