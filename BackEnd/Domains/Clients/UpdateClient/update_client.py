import os
import mysql.connector
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

def update_client(client_id, first_name, last_name, id_card, phone, city, address):
    """Updates client data by ID"""
    try:
        # Establish connection using the full DATABASE_URL string
        conn = mysql.connector.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE clients 
            SET nombre = %s, apellido = %s, cedula = %s, telefono = %s, ciudad = %s, direccion = %s
            WHERE id = %s
            """,
            (first_name, last_name, id_card, phone, city, address, client_id)
        )

        conn.commit()
        cursor.close()
        conn.close()

        if cursor.rowcount > 0:
            return {
                "id": client_id,
                "first_name": first_name,
                "last_name": last_name,
                "id_card": id_card,
                "phone": phone,
                "city": city,
                "address": address
            }
        else:
            return {"error": "Client not found"}

    except mysql.connector.Error as e:
        return {"error": str(e)}
