import flask
import os
from api import app
from api.utils import validation


@app.route("/api/v1/min_max", methods=["POST"])
def min_max():
    file_path = f"{app.root_path}/assets/datasets/"
    print(file_path)
    data = flask.request.get_json(force=True)

    if data:
        # Get the min and max values from the data
        min, max = validation.get_min_max_from_dataset(
            f'{file_path}{data["file_name"]}'
        )

        # Convert the min and max values to a dictionary

        min_dict = min.to_dict()
        max_dict = max.to_dict()

        return {"min": min_dict, "max": max_dict}

    return flask.abort(400, "No data was provided")
