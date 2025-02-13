import os
import psycopg2
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    """Establish a connection with PostgreSQL."""
    return psycopg2.connect(DATABASE_URL)

def search_user_by_id(user_id):
    """Search for a user by ID."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    return user

def search_user_by_name(name):
    """Search for users by name (partial match)."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email FROM users WHERE name ILIKE %s", (f"%{name}%",))
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return users
