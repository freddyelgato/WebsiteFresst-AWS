from flask import Blueprint, request, jsonify
from flask_cors import CORS
from update_client import update_client

update_client_bp = Blueprint("update_client_bp", __name__)
CORS(update_client_bp)

@update_client_bp.route("/update/<int:client_id>", methods=["PUT"])
def update_client_route(client_id):
    """Ruta para actualizar los datos del cliente"""
    data = request.json
    required_fields = ["nombre", "apellido", "cedula", "telefono", "ciudad", "direccion"]

    if not all(field in data for field in required_fields):
        return jsonify({"error": "Faltan datos requeridos"}), 400

    result = update_client(client_id, data["nombre"], data["apellido"], data["cedula"], data["telefono"], data["ciudad"], data["direccion"])

    if "error" in result:
        return jsonify(result), 500

    return jsonify({"message": "Cliente actualizado", "client": result}), 200
