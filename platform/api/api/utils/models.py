import pickle

from api import app


def load_model(file_name: str):
    """
    This function is loading the model from the assets/models folder.
    """
    file_path = f"{app.root_path}/assets/models/{file_name}"
    model = pickle.load(open(file_path, "rb"))
    return model
