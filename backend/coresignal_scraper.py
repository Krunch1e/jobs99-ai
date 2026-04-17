import requests
import os
from dotenv import load_dotenv
import json
import time

load_dotenv()

API_KEY = os.getenv("CORESIGNAL_API_KEY")
BASE_URL = "https://api.coresignal.com/v1/jobs/search/filter" 

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

major_cities = [
    "Delhi", "New Delhi", "Bangalore", "Bengaluru", "Hyderabad", "Noida",
    "Gurugram", "Gurgaon", "Mumbai", "Navi Mumbai", "Thane", "Chennai",
    "Pune", "Ahmedabad", "Surat", "Kolkata", "Jaipur", "Lucknow",
    "Indore", "Nagpur", "Patna", "Bhopal", "Vadodara", "Coimbatore",
    "Kochi", "Thiruvananthapuram", "Chandigarh", "Mysore", "Visakhapatnam",
    "Rajkot", "Varanasi", "Kanpur", "Ludhiana", "Amritsar", "Jalandhar",
    "Meerut", "Ranchi", "Bhubaneswar", "Guwahati", "Madurai", "Salem",
    "Trichy", "Mangalore", "Hubli", "Dharwad", "Jodhpur", "Udaipur",
    "Dehradun", "Haridwar", "Agra", "Mathura", "Allahabad", "Prayagraj",
    "Gwalior", "Jabalpur", "Aurangabad", "Nashik"
]

def fetch_jobs_from_coresignal(max_pages: int = 20, page_size: int = 100):
    query = {
        "title": ["Software Engineer", "API Developer", "DevOps", "Data Scientist", "Machine Learning Engineer"],
        # CORRECTED: The field name must be "location", not "location_name".
        "location": major_cities,
        "employment_type": ["Full-time", "Part-time", "Contract"],
        "work_model": ["Remote", "On-site", "Hybrid"]
    }

    search_response = requests.post(BASE_URL, headers=headers, json=query)

    if search_response.status_code != 200:
        error_details = search_response.text
        raise Exception(f"Coresignal search failed with status code {search_response.status_code}: {error_details}")

    search_id = search_response.json().get("search_id")
    if not search_id:
        raise Exception("Search ID not found in Coresignal response")

    jobs = []
    for page in range(1, max_pages + 1):
        collect_url = f"https://api.coresignal.com/v1/jobs/collect/{search_id}?page={page}&page_size={page_size}"
        time.sleep(1) # Good practice to wait a moment before polling

        r = requests.get(collect_url, headers=headers)
        
        if r.status_code == 200:
            data = r.json()
            if not data:
                break # Stop if a page returns no data
            
            for job in data:
                job_info = {
                    "roles": job.get("title"),
                    "companies": job.get("company_name"),
                    "locations": job.get("location"),
                    "experience": job.get("employment_type"),
                    "salaries": "Not Disclosed Yet",
                    "skills": ", ".join(job.get("skills", [])) if job.get("skills") else ""
                }
                jobs.append(job_info)
        else:
            print(f"Error fetching page {page}: Status {r.status_code} - {r.text}")

    return jobs

