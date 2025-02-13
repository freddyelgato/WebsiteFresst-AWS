from flask import Flask
from updateRoutes.routes import update_client_bp
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"])

# Configure Swagger
SWAGGER_URL = "/swagger"
API_URL = "/static/swagger.json"
swagger_ui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL)
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)

# Register routes
app.register_blueprint(update_client_bp)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5007)
