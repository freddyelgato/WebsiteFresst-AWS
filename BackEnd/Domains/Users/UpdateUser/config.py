from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from the .env file

class Config:
    DATABASE_URL = os.getenv("DATABASE_URL")
