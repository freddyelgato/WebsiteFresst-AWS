import os
from dotenv import load_dotenv
import psycopg2

# Load environment variables
load_dotenv()

# Get the database URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    """Establish a connection to the database"""
    try:
        # Connect to PostgreSQL using the database URL
        conn = psycopg2.connect(DATABASE_URL)
        print("✅ Successful connection to PostgreSQL from Flask")
        return conn
    except Exception as e:
        print("❌ Error connecting to PostgreSQL:", e)
        return None
