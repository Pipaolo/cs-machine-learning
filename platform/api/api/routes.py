from api import app


@app.route("/health-check")
def index():
    return "OK"
