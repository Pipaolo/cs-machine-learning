import flask

from api import app
from typing import cast
from marshmallow import Schema, fields, post_load, ValidationError
from api.utils.models import load_model
from sklearn.linear_model import LogisticRegression, LinearRegression


class Quiz2Part1Form:
    def __init__(self, sex: str, age: int, height: float, weight: float, children: int):
        self.sex = sex
        self.age = age
        self.height = height
        self.weight = weight
        self.children = children

    def __repr__(self):
        return "<Quiz2Part1Form()"


class Quiz2Part1FormSchema(Schema):
    sex = fields.Str(required=True)
    age = fields.Int(required=True)
    height = fields.Float(required=True)
    weight = fields.Float(required=True)
    children = fields.Int(required=True)

    @post_load
    def make_object(self, data, **kwargs):
        return Quiz2Part1Form(**data)


@app.route("/api/v1/quiz-2/part-1/predict", methods=["POST"])
def predict_quiz_2_part_1():
    """
    This function is using the POST method to get the data from the user
    and return the prediction of the smoker classification model.
    """
    json = flask.request.get_json(force=True)
    schema = Quiz2Part1FormSchema()

    if not json:
        return flask.abort(400, "No data was provided")

    try:
        data = schema.load(json)
        parsed_data = cast(Quiz2Part1Form, data)

        # Convert the received height and weight to BMI
        bmi = parsed_data.weight / (parsed_data.height / 100) ** 2

        # Load the model the smoke classification model
        smoker_female_model = cast(
            LogisticRegression, load_model("smoker_female_model.pb")
        )
        smoker_male_model = cast(
            LogisticRegression, load_model("smoker_female_model.pb")
        )

        # Load the model the charges regression model
        smoker_female_charges_model = cast(
            LinearRegression, load_model("smoker_female_charges_model.pb")
        )
        smoker_male_charges_model = cast(
            LinearRegression, load_model("smoker_male_charges_model.pb")
        )
        non_smoker_female_charges_model = cast(
            LinearRegression, load_model("non_smoker_female_charges_model.pb")
        )
        non_smoker_male_charges_model = cast(
            LinearRegression, load_model("non_smoker_male_charges_model.pb")
        )

        # Predict the smoker classification
        input_values = [[parsed_data.age, bmi, parsed_data.children]]
        is_smoker_probs = []
        is_male = parsed_data.sex == "male"
        if is_male:
            is_smoker_probs = smoker_male_model.predict_proba(input_values)
        else:
            is_smoker_probs = smoker_female_model.predict_proba(input_values)

        is_smoker: bool = bool(is_smoker_probs[0][1] > 0.5)

        # Predict the charges
        charges = 0
        if is_smoker:
            if is_male:
                charges = smoker_male_charges_model.predict(input_values)[0]
            else:
                charges = smoker_female_charges_model.predict(input_values)[0]
        else:
            if is_male:
                charges = non_smoker_male_charges_model.predict(input_values)[0]
            else:
                charges = non_smoker_female_charges_model.predict(input_values)[0]

        return {
            "smoker_probability": is_smoker_probs[0][1],
            "non_smoker_probability": is_smoker_probs[0][0],
            "is_smoker": is_smoker,
            "charges": charges,
        }
    except ValidationError as err:
        return {"errors": err.messages_dict}
