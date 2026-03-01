# GitHub Copilot Instructions

## Project Overview
This is a full-stack **Course Recommender System** that parses resumes using NLP to extract skills, then recommends personalized YouTube courses and roadmaps.

## Architecture
The project is split into three microservices:

- **`frontend/`** — React 19 + Vite + Tailwind CSS client (runs on port 5173)
- **`backend/node/`** — Node.js + Express API Gateway; handles YouTube Data API calls and recommendation logic (runs on port 5000)
- **`backend/NER-Service/`** — Python FastAPI service using spaCy for Named Entity Recognition / resume skill extraction (runs on port 8000)

## Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS, Axios
- **Node Backend:** Express.js, multer, pdf-parse
- **Python Backend:** FastAPI, spaCy (`en_core_web_sm`), Uvicorn
- **Infrastructure:** Docker, Docker Compose

## Key Conventions
- Environment variables are stored in `.env` files (never committed).
  - Root `.env`: `YOUTUBE_API_KEY`
  - `backend/node/.env`: `PORT`, `NER_API_URL`, `YOUTUBE_API_KEY`, `CORS_ORIGIN`
  - `frontend/.env`: `VITE_API_URL`
- The Node backend proxies requests to the Python NER service via `NER_API_URL`.
- Resume files are uploaded as multipart form data and parsed from PDF using `pdf-parse`.
- Course data is stored in `backend/node/courses.json` and skills in `backend/node/skills.json`.

## Development Workflow
- Run the full stack with Docker Compose: `docker-compose up --build`
- Run the frontend separately: `cd frontend && npm install && npm run dev`
- Run the Node backend separately: `cd backend/node && npm run dev`
- Run the Python NER service separately: `cd backend/NER-Service && uvicorn ner_service:app --reload --port 8000`
