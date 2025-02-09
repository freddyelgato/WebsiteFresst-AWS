import os
import psycopg2
from dotenv import load_dotenv

# Cargar las variables de entorno
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

def update_user(user_id, name, email):
    """Actualiza el nombre y correo de un usuario por su ID"""
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE users SET name = %s, email = %s WHERE id = %s RETURNING id, name, email",
            (name, email, user_id)
        )
        updated_user = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        if updated_user:
            return {"id": updated_user[0], "name": updated_user[1], "email": updated_user[2]}
        return None
    except Exception as e:
        return {"error": str(e)}
