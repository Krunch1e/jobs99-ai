from fastapi import Depends, FastAPI, UploadFile, File, Form, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import stripe
from dotenv import load_dotenv
from sqlalchemy.orm import Session
import pandas as pd


# Import your new modules
from backend.main import app
from . import models, schemas
from .database import SessionLocal, engine
from .ai import parser, tailor, matcher, cover_letter
from.ai import ollama_client as ollama
from .coresignal_scraper import fetch_jobs_from_coresignal
from supabase import create_client, Client
# Load environment variables
load_dotenv()

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

# Stripe secret key from environment
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Serve frontend
@app.get("/")
def serve_index():
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))

@app.get("/style.css")
def serve_css():
    return FileResponse(os.path.join(FRONTEND_DIR, "style.css"))

@app.get("/script.js")
def serve_js():
    return FileResponse(os.path.join(FRONTEND_DIR, "script.js"))

@app.get("/success.html")
def success_page():
    return FileResponse(os.path.join(FRONTEND_DIR, "success.html"))

@app.get("/cancel.html")
def cancel_page():
    return FileResponse(os.path.join(FRONTEND_DIR, "cancel.html"))

@app.get("/Signin.html")
def Signin_page():
    return FileResponse(os.path.join(FRONTEND_DIR, "Signin.html"))

@app.get("/employer-dashboard.html")
def employer_dashboard_page():
    return FileResponse(os.path.join(FRONTEND_DIR, "employer-dashboard.html"))

@app.get("/admin-dashboard.html")
def admin_dashboard_page():
    return FileResponse(os.path.join(FRONTEND_DIR, "admin-dashboard.html"))

@app.get("/bulk.html")
def bulk_page():
    return FileResponse(os.path.join(FRONTEND_DIR, "bulk.html"))

# ======================
# Job APIs
# ======================

@app.post("/fetch-and-store-jobs")
def fetch_and_store_jobs(db: Session = Depends(get_db)):
    try:
        jobs_data = fetch_jobs_from_coresignal()
        for job_data in jobs_data:
            db_job = models.Job(**job_data)
            db.add(db_job)
        db.commit()
        return {"message": f"{len(jobs_data)} jobs fetched and stored successfully."}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/jobs", response_model=list[schemas.Job])
def get_jobs(
    search: str = "",
    location: str = "",
    experience: str = "",
    limit: int = 50,
    db: Session = Depends(get_db)
):
    query = db.query(models.Job)

    if search:
        query = query.filter(models.Job.roles.ilike(f"%{search}%"))
    if location:
        query = query.filter(models.Job.locations.ilike(f"%{location}%"))
    if experience:
        query = query.filter(models.Job.experience.ilike(f"%{experience}%"))

    jobs = query.limit(limit).all()
    return jobs

@app.get("/candidates")
def get_mock_candidates():
    candidates = [
        {"name": "Sarah Wilson", "role": "Full Stack Engineer", "score": 98, "status": "Interviewing", "source": "AI Search"},
        {"name": "Michael Chen", "role": "DevOps Lead", "score": 95, "status": "Screening", "source": "Direct"},
        {"name": "Elena Rodriguez", "role": "Product Designer", "score": 92, "status": "Offer sent", "source": "AI Search"},
        {"name": "David Kim", "role": "Python Developer", "score": 89, "status": "Applied", "source": "AI Search"},
        {"name": "Sophie Martin", "role": "UI/UX Specialist", "score": 84, "status": "Shortlisted", "source": "Direct"},
    ]
    return candidates

@app.get("/user/applications")
def get_user_applications():
    apps = [
        {"id": 1, "title": "Senior AI Engineer", "company": "OpenAI", "applied_date": "2024-04-10", "status": "Interviewing", "match": 98},
        {"id": 2, "title": "Frontend Architect", "company": "Vercel", "applied_date": "2024-04-08", "status": "Technical Task", "match": 94},
        {"id": 3, "title": "Product Designer", "company": "Linear", "applied_date": "2024-04-05", "status": "Applied", "match": 92},
    ]
    return apps

# ======================
# AI Endpoints
# ======================

@app.post("/parse-resume/")
async def parse_resume_endpoint(file: UploadFile = File(...)):
    try:
        text = await parser.extract_text_from_pdf(file)
        result = parser.parse_resume(text)
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/tailor-resume/")
async def tailor_resume_endpoint(file: UploadFile = File(...), job_description: str = Form(...)):
    try:
        text = await parser.extract_text_from_pdf(file)
        tailored_summary = tailor.get_tailored_summary(text, job_description)
        # Check for an error message from the AI client
        if "[ERROR]" in tailored_summary:
            raise Exception(tailored_summary)
        return JSONResponse(content={"tailored_resume": tailored_summary})
    except Exception as e:
        print(f"Error in /tailor-resume/: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/match-score/")
async def match_score(file: UploadFile = File(...), job_description: str = Form(...)):
    try:
        # 1. Extract text from resume PDF
        text = await parser.extract_text_from_pdf(file)

        # 2. Ask Olama model to rate similarity
        prompt = f"""
You are an HR AI. Rate how well the following resume matches the given job description.
Give a match percentage out of 100 and nothing else.

Resume:
{text}

Job Description:
{job_description}
"""

        response = ollama.generate_llm_response(prompt, model="llama3")
        score_raw = response

        # Extract number from response (e.g., "Match: 75%")
        import re
        match = re.search(r'(\d{2,3})', score_raw)
        score = int(match.group(1)) if match else 70

        return JSONResponse(content={"match_score": score})
    except Exception as e:
        print("❌ Error in /match-score/:", e)
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/cover-letter/")
async def generate_cover_letter_endpoint(file: UploadFile = File(...), job_description: str = Form(...)):
    try:
        text = await parser.extract_text_from_pdf(file)
        cover_letter_text = cover_letter.generate(text, job_description)
        # Check for an error message from the AI client
        if "[ERROR]" in cover_letter_text:
            raise Exception(cover_letter_text)
        return JSONResponse(content={"cover_letter": cover_letter_text})
    except Exception as e:
        print(f"Error in /cover-letter/: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)


# ======================
# Authentication Endpoints
# ======================

@app.post("/signup")
async def signup(request: Request):
    body = await request.json()
    email = body.get("email")
    password = body.get("password")
    full_name = body.get("full_name")
    account_type = body.get("account_type") # We'll update this after sign-up

    try:
        # Create user in Supabase Auth
        auth_response = supabase.auth.sign_up({
            "email": email,
            "password": password,
            "options": {
                "data": {
                    "full_name": full_name
                }
            }
        })

        # The trigger will create the basic profile. Now, let's update the account_type.
        if auth_response.user:
            user_id = auth_response.user.id
            supabase.table('profiles').update({'account_type': account_type}).eq('id', user_id).execute()

        return JSONResponse(content={"message": "User signed up successfully. Please check your email to verify."})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

@app.post("/signin")
async def signin(request: Request):
    body = await request.json()
    email = body.get("email")
    password = body.get("password")

    try:
        auth_response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        return JSONResponse(content=auth_response.dict())
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

# ======================
# Stripe Payments
# ======================

@app.post("/create-checkout-session")
async def create_checkout_session(plan: str = "pro"):
    try:
        if plan == "pro":
            price = 29900  # ₹299.00
            name = "Jobs99 Pro Plan"
        elif plan == "pro_plus":
            price = 249900  # ₹2499.00
            name = "Jobs99 Pro Plus Plan"
        else:
            return JSONResponse(content={"error": "Invalid plan"}, status_code=400)

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "inr",
                    "product_data": {"name": name},
                    "unit_amount": price
                },
                "quantity": 1
            }],
            mode="payment",
            success_url="http://localhost:8000/success.html",
            cancel_url="http://localhost:8000/cancel.html"
        )
        return JSONResponse(content={"id": session.id})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
