from flask import Blueprint, request, jsonify
from flask_cors import CORS
from update_user import update_user

update_user_bp = Blueprint("update_user_bp", __name__)
CORS(update_user_bp)

@update_user_bp.route("/update/<int:user_id>", methods=["PUT"])
def update_user_route(user_id):
    """Route to update the user's name and email"""
    data = request.json
    if "name" not in data or "email" not in data:
        return jsonify({"error": "Missing required data"}), 400

    result = update_user(user_id, data["name"], data["email"])

    if "error" in result:
        return jsonify(result), 500

    return jsonify({"message": "User updated", "user": result}), 200
