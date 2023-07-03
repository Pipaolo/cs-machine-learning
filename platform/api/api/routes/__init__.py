from api import app
import api.routes.quiz_2
import api.routes.problemset_4


@app.route("/api/v1/health-check")
def health_check():
    return "OK"
