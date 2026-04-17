from pydantic import BaseModel

class JobBase(BaseModel):
    roles: str | None = None
    companies: str | None = None
    locations: str | None = None
    experience: str | None = None
    salaries: str | None = None
    skills: str | None = None

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: int

    class Config:
        from_attributes = True