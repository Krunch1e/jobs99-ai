# Jobs99.ai – AI-Powered Job Marketplace Platform

Jobs99.ai is a collaborative AI-powered recruitment platform designed to help job seekers discover opportunities, optimize resumes, generate cover letters, and receive intelligent job recommendations.

The platform combines traditional job marketplace functionality with AI-assisted career tools and subscription-based premium features.

## Features

### Job Marketplace

* Browse and search job listings
* Filter jobs by role, skills, location, and experience
* View detailed job information
* Resume upload support

### AI-Powered Career Tools

* Resume parsing
* Resume tailoring based on job descriptions
* AI-powered job matching
* Cover letter generation
* Candidate-job compatibility scoring

### Subscription System

* Stripe Checkout integration
* Premium membership plans
* Subscription-based feature access

### Dashboards

* Job Seeker Dashboard
* Employer Dashboard
* Administrative Dashboard

## Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS
* JavaScript / TypeScript

### Backend

* Python
* FastAPI
* REST APIs

### Database

* PostgreSQL
* Supabase

### AI & Data Processing

* Ollama
* Large Language Models (LLMs)
* Resume Processing Pipelines

### Payments

* Stripe Checkout

## My Contribution

I contributed to the backend development and system integration of Jobs99.ai during the Synergy Labs training program.

Key areas of contribution included:

* FastAPI backend integration
* REST API development and debugging
* Job search and filtering functionality
* Stripe Checkout integration
* Frontend-backend integration
* AI feature integration support
* System integration testing
* Multi-developer codebase debugging and maintenance

This was a collaborative team project and was not solely developed by me.

## Repository Structure

```text
frontend/          Next.js frontend
backend/           FastAPI backend services
ai_services/       AI-powered workflows
scrapper/          Job aggregation utilities
database/          Database-related components
```

## Local Setup

### Backend

```bash
uvicorn backend.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### AI Services

Ensure Ollama is installed and running locally if AI-powered resume processing and matching features are enabled.

## Disclaimer

This repository represents a collaborative development effort. My fork is maintained to showcase my contribution to backend development, API integration, payment workflows, AI integration support, and system integration activities completed during the project.
