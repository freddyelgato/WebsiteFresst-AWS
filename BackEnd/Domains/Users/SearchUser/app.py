from flask import Flask
from flask_cors import CORS
from searchRoutes.routes import create_routes

app = Flask(__name__)
CORS(app)

# Register routes
create_routes(app)

if __name__ == "__main__":
    app.run(debug=True, port=5003)
