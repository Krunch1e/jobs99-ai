from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sys
import os

# Add the project root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.database import Base, engine
from backend.models import Job

# Create tables
Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

# Seed data
jobs = [
    Job(roles="Senior AI Engineer", companies="OpenAI", locations="San Francisco, CA", experience="5+ years", salaries="$200k - $300k", skills="Python, PyTorch, LLMs"),
    Job(roles="Lead Product Designer", companies="Linear", locations="Remote", experience="Senior", salaries="$160k - $220k", skills="Figma, React, Motion Design"),
    Job(roles="Frontend Architect", companies="Vercel", locations="New York / Remote", experience="7+ years", salaries="$180k - $250k", skills="Next.js, TypeScript, Turbopack"),
    Job(roles="DevOps Specialist", companies="Stripe", locations="Remote", experience="Mid-Senior", salaries="$150k - $210k", skills="Kubernetes, Terraform, AWS"),
]

try:
    # Clear existing jobs
    db.query(Job).delete()
    db.add_all(jobs)
    db.commit()
    print("Database seeded successfully with 4 elite roles.")
except Exception as e:
    db.rollback()
    print(f"Error seeding database: {e}")
finally:
    db.close()
