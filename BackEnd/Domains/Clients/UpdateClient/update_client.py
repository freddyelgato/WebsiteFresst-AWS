import os
import mysql.connector
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

def update_client(client_id, nombre, apellido, cedula, telefono, ciudad, direccion):
    """Actualiza los datos de un cliente por su ID"""
    try:
        # Realizar la conexión usando la cadena completa DATABASE_URL
        conn = mysql.connector.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE clients 
            SET nombre = %s, apellido = %s, cedula = %s, telefono = %s, ciudad = %s, direccion = %s
            WHERE id = %s
            """,
            (nombre, apellido, cedula, telefono, ciudad, direccion, client_id)
        )

        conn.commit()
        cursor.close()
        conn.close()

        if cursor.rowcount > 0:
            return {
                "id": client_id,
                "nombre": nombre,
                "apellido": apellido,
                "cedula": cedula,
                "telefono": telefono,
                "ciudad": ciudad,
                "direccion": direccion
            }
        else:
            return {"error": "Cliente no encontrado"}

    except mysql.connector.Error as e:
        return {"error": str(e)}
