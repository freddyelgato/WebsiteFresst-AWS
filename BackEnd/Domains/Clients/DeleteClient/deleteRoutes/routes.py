from flask import Blueprint, request
from delete_client import delete_client

delete_client_bp = Blueprint('delete_client', __name__)

@delete_client_bp.route('/delete/<int:client_id>', methods=['DELETE'])
def delete(client_id):
    return delete_client(client_id)
