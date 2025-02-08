import psycopg2
import os
from flask import jsonify

def delete_user(user_id):
    try:
        # Conexión a la base de datos
        conn = psycopg2.connect(os.getenv('DATABASE_URL'))
        cursor = conn.cursor()
        
        # Query para eliminar el usuario
        query = "DELETE FROM users WHERE id = %s RETURNING *"
        cursor.execute(query, (user_id,))
        
        # Si el usuario no existe
        if cursor.rowcount == 0:
            return jsonify({"message": "Usuario no encontrado"}), 404
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({"message": "Usuario eliminado exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
