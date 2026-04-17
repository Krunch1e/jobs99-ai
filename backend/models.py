from sqlalchemy import Column, Integer, String, Text
from .database import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    roles = Column(String, index=True)
    companies = Column(String)
    locations = Column(String)
    experience = Column(String)
    salaries = Column(String)
    skills = Column(Text)