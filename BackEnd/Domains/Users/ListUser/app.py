from flask import Flask
from flask_cors import CORS
from flasgger import Swagger
from userRoutes.routes import user_bp

app = Flask(__name__)

# Habilitar CORS
CORS(app)

# Configurar Swagger
swagger_template = {
    "swagger": "2.0",
    "info": {
        "title": "User API",
        "description": "Microservicio para listar usuarios",
        "version": "1.0.0"
    }
}
Swagger(app, template=swagger_template)

# Registrar rutas
app.register_blueprint(user_bp)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
