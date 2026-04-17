# Jobs99.ai - Futuristic AI Career Platform

A production-grade, AI-native career intelligence ecosystem built with Next.js 15, FastAPI, and Three.js.

## 🚀 Quick Start

### 1. Backend (FastAPI)
```bash
uvicorn backend.main:app --reload
```

### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

### 3. AI Requirements
Ensuring **Ollama** is running locally for real-time resume parsing and job matching.

## 📁 Architecture
- `/frontend`: Next.js 15 App Router with Tailwind + Framer Motion + R3F.
- `/backend`: FastAPI service handling AI logic, matching, and SQLite database.
- `/frontend-legacy`: Original static HTML files preserved for reference.

## ✨ Key Features
- **Neural Hero**: Interactive 3D visual experience.
- **AI Toolset**: Resume parsing, tailoring, and match scores.
- **Smart Dashboards**: Real-time analytics for Seekers, Employers, and Admins.
- **Aether Design System**: Premium, dark-themed glassmorphic components.
