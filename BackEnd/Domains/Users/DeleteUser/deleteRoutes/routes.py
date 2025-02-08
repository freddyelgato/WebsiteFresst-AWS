from flask import Blueprint, request
from delete_user import delete_user

delete_user_bp = Blueprint('delete_user', __name__)

@delete_user_bp.route('/delete/<int:user_id>', methods=['DELETE'])
def delete(user_id):
    return delete_user(user_id)
