from flask import Flask
from flask_cors import CORS
from deleteRoutes.routes import delete_client_bp
from flask_swagger_ui import get_swaggerui_blueprint


app = Flask(__name__)

    
    # Habilitar CORS
CORS(app)

    # Registrar rutas
app.register_blueprint(delete_client_bp)
    
    # Configurar Swagger
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'

swaggerui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5008)
