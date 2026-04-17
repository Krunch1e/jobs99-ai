# backend/ai/tailor.py

from .ollama_client import generate_llm_response

def get_tailored_summary(resume_text, job_description):
    prompt = f"""
    Based on the resume and job description below, rearrange the skils and experiences in the given resume to make it more relevant to the given job description:

    Resume:
    {resume_text}

    Job Description:
    {job_description}

    Tailored Summary:
    """
    return generate_llm_response(prompt)
