from api import app
import api.routes.quiz_2


@app.route("/api/v1/health-check")
def health_check():
    return "OK"
