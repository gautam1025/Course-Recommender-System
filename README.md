# 🎓 AI-Powered Career & Course Recommender System

A full-stack intelligent recommendation engine that provides personalized course suggestions and structured career roadmaps based on resume analysis. Built with **React, Node.js, and Python (NER)**.

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/spaCy-09A3D5?style=for-the-badge&logo=spacy&logoColor=white" />
</div>

---

## 🚀 Key Features

### 📄 Intelligent Resume Parsing
- Upload your resume (PDF) and let our **Python NER Service (spaCy)** extract your skills, experience, and domain.
- Automatically detects your current proficiency level.

### 🧠 Context-Aware Recommendations
- **Upskill Mode**: Finds courses to deepen your expertise in your *current* field.
- **Domain Switch Mode**: Suggests foundational paths to help you pivot to a *new* career (e.g., Web Dev → Data Science).

### 🎨 Premium Glassmorphism UI (New!)
- **Animated Interface**: Smooth, engaging animations with a dynamic global background.
- **Dark Mode**: Sleek, modern dark theme with vibrant accents and glass-morphism cards.
- **Interactive Dashboard**: Visualize your career path with a dynamic timeline.

### 📚 Multi-Source Aggregation
- Fetches real-time course data from **YouTube** (via API) and simulates data from **Udemy** & **Coursera**.
- **Smart De-duplication**: Ensures you don't see the same course twice.

### 🗺️ Dynamic Career Roadmaps
- Generates a step-by-step career path tailored to your specific goal.
- Tracks your progress through different learning stages.

---

## 🏛️ Technical Architecture

The project uses a **Microservice Architecture**:

1.  **Frontend (React + Tailwind)**:
    -   User interface for uploading resumes and viewing results.
    -   Communicates with the Node.js API Gateway.
2.  **API Gateway (Node.js/Express)**:
    -   Orchestrates data flow.
    -   Handles file uploads and forwards text to the NLP service.
    -   Aggregates course data from external APIs.
3.  **NLP Service (Python/FastAPI)**:
    -   Specialized service for Named Entity Recognition (NER).
    -   Parses raw text to identifying tech skills and job roles.

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React, Tailwind CSS, Axios, Lucide React, Framer Motion (styles) |
| **Backend (Gateway)** | Node.js, Express, Multer, PDF-Parse, Winston Logger |
| **AI / NLP** | Python, FastAPI, spaCy (en_core_web_sm), Uvicorn |
| **Database** | MongoDB (for user profiles/history - *optional*) |

---

## ⚙️ Local Setup & Installation

### 1. Prerequisites
- **Node.js** (v16+)
- **Python** (v3.8+)
- **Git**

### 2. Clone the Repository
```bash
git clone https://github.com/gautam1025/Course-Recommender-System.git
cd Course-Recommender-System
```

### 3. Backend Setup

#### a. Node.js API Gateway
```bash
cd backend/node
npm install
# Format .env file
echo "PORT=5000" > .env
echo "NLP_SERVICE_URL=http://localhost:8000" >> .env
# Start the server
node server.js
```

#### b. Python NLP Service
```bash
cd backend/NER-Service
# Create venv
python -m venv venv
# Activate venv (Windows)
venv\Scripts\activate
# Install deps
pip install -r requirements.txt
# Download spaCy model
python -m spacy download en_core_web_sm
# Start service
python -m uvicorn ner_service:app --reload --port 8000
```

### 4. Frontend Setup
```bash
cd frontend
npm install
# Start dev server
npm run dev
```

Visit **`http://localhost:5173`** to use the app!

---

## 📈 Future Roadmap
- [ ] User Authentication (Save progress)
- [ ] Job Board Integration (LinkedIn/Indeed APIs)
- [ ] Advanced Transformer Models (BERT/RoBERTa) for better matching

---

## 📄 License
MIT License.