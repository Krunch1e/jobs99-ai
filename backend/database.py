from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# --- START OF CHANGES ---
# Explicitly find the .env file in the project's root directory
# This is more robust and prevents issues where the file isn't found.
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(project_root, '.env')

if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path=dotenv_path)
else:
    print("Warning: .env file not found. Please ensure it is in the project root.")

# --- END OF CHANGES ---


SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# Check if we are using SQLite and apply necessary arguments
if SQLALCHEMY_DATABASE_URL and SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    # The pool_pre_ping=True setting makes the connection more resilient for PostgreSQL.
    engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

