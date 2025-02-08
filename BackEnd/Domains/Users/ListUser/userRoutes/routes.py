from flask import Blueprint, jsonify
from flasgger import swag_from
from list_service import get_all_users

user_bp = Blueprint("user_routes", __name__)

@user_bp.route("/users", methods=["GET"])
@swag_from({
    "responses": {
        200: {
            "description": "Lista de usuarios",
            "schema": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {"type": "integer"},
                        "name": {"type": "string"},
                        "email": {"type": "string"},
                        "role": {"type": "string"}
                    }
                }
            }
        }
    }
})
def list_users():
    """Retorna la lista de usuarios en formato JSON"""
    users = get_all_users()
    return jsonify(users), 200
