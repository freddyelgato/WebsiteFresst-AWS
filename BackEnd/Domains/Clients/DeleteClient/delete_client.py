import mysql.connector
import os
from flask import jsonify

def delete_client(client_id):
    try:

        conn = mysql.connector.connect(os.getenv('DATABASE_URL'))
        cursor = conn.cursor()
        

        query = "DELETE FROM clients WHERE id = %s"
        cursor.execute(query, (client_id,))
        
     
        if cursor.rowcount == 0:
            return jsonify({"message": "Cliente no encontrado"}), 404
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({"message": "Cliente eliminado exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
