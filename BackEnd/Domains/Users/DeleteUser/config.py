from dotenv import load_dotenv
import os

load_dotenv()  # Cargar las variables de entorno del archivo .env

class Config:
    DATABASE_URL = os.getenv('DATABASE_URL')
