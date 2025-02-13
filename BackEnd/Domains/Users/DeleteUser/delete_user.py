import psycopg2
import os
from flask import jsonify

def delete_user(user_id):
    try:
        # Connect to the database
        conn = psycopg2.connect(os.getenv('DATABASE_URL'))
        cursor = conn.cursor()
        
        # Query to delete the user
        query = "DELETE FROM users WHERE id = %s RETURNING *"
        cursor.execute(query, (user_id,))
        
        # If the user doesn't exist
        if cursor.rowcount == 0:
            return jsonify({"message": "User not found"}), 404
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({"message": "User successfully deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
