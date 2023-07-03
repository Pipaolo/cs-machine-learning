import flask

from api import app
from typing import cast
from marshmallow import Schema, fields, post_load, ValidationError
from api.utils.models import load_model
from sklearn.neighbors import KNeighborsClassifier


class ProblemSet4Form:
    def __init__(
        self,
        pregnancies: float,
        glucose: float,
        blood_pressure: float,
        skin_thickness: float,
        insulin: float,
        bmi: float,
        diabetes_pedigree_function: float,
        age: int,
    ):
        self.pregnancies = pregnancies
        self.glucose = glucose
        self.blood_pressure = blood_pressure
        self.skin_thickness = skin_thickness
        self.insulin = insulin
        self.bmi = bmi
        self.diabetes_pedigree_function = diabetes_pedigree_function
        self.age = age


class ProblemSet4FormSchema(Schema):
    pregnancies = fields.Float(required=True)
    glucose = fields.Float(required=True)
    blood_pressure = fields.Float(required=True)
    skin_thickness = fields.Float(required=True)
    insulin = fields.Float(required=True)
    bmi = fields.Float(required=True)
    diabetes_pedigree_function = fields.Float(required=True)
    age = fields.Float(required=True)

    @post_load
    def make_object(self, data, **kwargs):
        return ProblemSet4Form(**data)


@app.route("/api/v1/problemset-4/predict", methods=["POST"])
def predict_problemset_4():
    """
    This function is using the POST method to get the data from the user
    and return the prediction of the diabetes classification model.
    """
    json = flask.request.get_json(force=True)
    schema = ProblemSet4FormSchema()

    if not json:
        return flask.abort(400, "No data was provided")

    try:
        data = schema.load(json)
        parsed_data = cast(ProblemSet4Form, data)

        # Load the diabetes classification model
        pairs: list[tuple[str, str]] = [
            ("Glucose", "BloodPressure"),
            ("Glucose", "Insulin"),
            ("Glucose", "Age"),
            ("Insulin", "BMI"),
            ("Insulin", "Age"),
        ]

        # Load the diabetes classification model
        glucose_age_model = load_model("knn_glucose_age_model.pkl")
        glucose_blood_pressure_model = load_model("knn_glucose_bloodpressure_model.pkl")
        glucose_insulin_model = load_model("knn_glucose_insulin_model.pkl")
        insulin_bmi_model = load_model("knn_insulin_bmi_model.pkl")
        insulin_age_model = load_model("knn_insulin_age_model.pkl")

        """
            Predict the probability of the patient having diabetes
            based on the input values and the loaded models.

            The probability is calculated by determining the number of positive predictions
            and dividing it by the total number of predictions.
        """
        is_diabetic_results: list[bool] = []

        is_diabetic_results.append(
            glucose_age_model.predict([[parsed_data.glucose, parsed_data.age]])[0]
        )

        is_diabetic_results.append(
            glucose_blood_pressure_model.predict(
                [[parsed_data.glucose, parsed_data.blood_pressure]]
            )[0]
        )

        is_diabetic_results.append(
            glucose_insulin_model.predict([[parsed_data.glucose, parsed_data.insulin]])[
                0
            ]
        )

        is_diabetic_results.append(
            insulin_bmi_model.predict([[parsed_data.insulin, parsed_data.bmi]])[0]
        )

        is_diabetic_results.append(
            insulin_age_model.predict([[parsed_data.insulin, parsed_data.age]])[0]
        )

        # Check if there are more positive predictions than negative predictions
        is_diabetic: bool = is_diabetic_results.count(True) > is_diabetic_results.count(
            False
        )

        return {
            "is_diabetic": is_diabetic,
        }
    except ValidationError as err:
        return {"errors": err.messages_dict}
