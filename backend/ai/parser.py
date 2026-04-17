import pdfplumber
import spacy
import re
# backend/ai/parser.py
import fitz  # from PyMuPDF

async def extract_text_from_pdf(file):
    try:
        file_bytes = await file.read()
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        return f"[ERROR] Failed to extract text: {str(e)}"

def parse_resume(text):
    # Dummy parser just for testing
    return {"extracted_text": text[:500]}  # return first 500 characters