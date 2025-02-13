from config import get_db_connection

def get_all_users():
    """Gets all users from the database"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, name, email, role FROM users")
    users = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return [{"id": u[0], "name": u[1], "email": u[2], "role": u[3]} for u in users]
