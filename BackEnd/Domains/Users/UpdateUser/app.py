from flask import Flask
from updateRoutes.routes import update_user_bp
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)

# Configurar Swagger
SWAGGER_URL = "/swagger"
API_URL = "/static/swagger.json"
swagger_ui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL)
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)

# Registrar las rutas
app.register_blueprint(update_user_bp)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5002)
