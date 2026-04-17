# backend/ai/matcher.py
from .ollama_client import generate_llm_response
import re

def get_match_score(resume_text, job_description):
    prompt = f"""
    Based on the resume and job description below, estimate the match percentage (0-100) between the candidate and the role. Only return a number.

    Resume:
    {resume_text}

    Job Description:
    {job_description}
    """
    response = generate_llm_response(prompt)
    match = re.search(r'\d{2,3}', response)
    return int(match.group()) if match else 0
