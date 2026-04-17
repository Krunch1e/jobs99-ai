# backend/ai/cover_letter.py

from .ollama_client import generate_llm_response

def generate(resume_text, job_description):
    prompt = f"""
    You are a professional career coach AI.

Write a strong, engaging, and well-structured **cover letter** tailored for the job below using the given resume.
and analyse the resume and job description and give me the cover letter.                                            
Instructions:
- Use professional but confident tone
- Keep it concise: 250–300 words
- Format with short paragraphs, clear structure
- Do not include generic fluff
- Emphasize relevant skills with examples

    Resume:
    {resume_text}

    Job Description:
    {job_description}

    Return only the formatted cover letter without headers.
    """
    return generate_llm_response(prompt)

