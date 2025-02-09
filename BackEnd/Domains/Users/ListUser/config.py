import os
from dotenv import load_dotenv
import psycopg2

# Cargar variables de entorno
load_dotenv()

# Obtener la URL de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    """Establece conexión con la base de datos"""
    try:
        conn = psycopg2.connect(DATABASE_URL)
        print("✅ Conexión exitosa a PostgreSQL desde Flask")
        return conn
    except Exception as e:
        print("❌ Error al conectar a PostgreSQL:", e)
        return None
