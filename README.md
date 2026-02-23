# Course Recommender System 🎓

![React](https://img.shields.io/badge/react-v19.1.1-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/node.js-v16+-339933?style=flat-square&logo=node.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688?style=flat-square&logo=fastapi)
![Docker](https://img.shields.io/badge/docker-%2B-2496ED?style=flat-square&logo=docker)

A full-stack intelligent Course Recommender System that parses resumes using Natural Language Processing (NLP) to extract skills, matches them against user goals (Skill Upgrade or Domain Change), and recommends personalized YouTube courses and roadmaps.

## 🌟 Features

- **Resume Parsing (NER):** Python FastAPI service using `spaCy` to extract skills, education, and experience from PDF resumes.
- **Intelligent Recommendations:** Node.js backend processes extracted skills against a specialized curriculum algorithm.
- **Interactive UI:** A modern, glassmorphic React frontend (Vite + Tailwind CSS).
- **YouTube Integration:** Fetches real-time, high-quality course playlists from the YouTube Data API.
- **Smart Wake-Up Ping:** Built-in mechanisms to awaken free-tier cloud services automatically.

---

## 🏗️ Architecture / Project Structure

The project consists of three main microservices:

1. **`frontend/`**: The React + Vite client.
2. **`backend/node/`**: The Node.js Express API Gateway. Handles YouTube API calls and logic.
3. **`backend/NER-Service/`**: The Python FastAPI service dedicated to Natural Language Processing (Resume text extraction).

---

## 🚀 Quick Start (Docker)

The absolute easiest way to run the entire stack locally is using **Docker Compose**.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) & Docker Compose
- YouTube Data API v3 Key (Get it from [Google Cloud Console](https://console.cloud.google.com/))

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gautam1025/Course-Recommender-System.git
   cd Course-Recommender-System
   ```

2. **Set up Environment Variables:**
   Create a `.env` file in the root directory (where `docker-compose.yml` is located):
   ```env
   YOUTUBE_API_KEY=your_google_youtube_api_key_here
   ```

3. **Run the cluster:**
   ```bash
   docker-compose up --build
   ```

4. **Run the frontend:**
   *(Since the frontend isn't in the docker-compose currently, you run it separately)*
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## 💻 Manual Setup (Without Docker)

If you prefer to run the services individually on your host machine:

### 1. Python NER Service (Backend)
This service extracts text and skills from the resume.

```bash
cd backend/NER-Service

# Create a virtual environment (optional but recommended)
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download the spaCy English model (REQUIRED)
python -m spacy download en_core_web_sm

# Run the server
uvicorn ner_service:app --reload --port 8000
```
*Service runs on: [http://localhost:8000](http://localhost:8000)*

---

### 2. Node.js API Gateway (Backend)
This is the core business logic and YouTube API handler.

```bash
cd backend/node

# Install dependencies
npm install

# Create environment variables
echo "PORT=5000" > .env
echo "NER_API_URL=http://localhost:8000/ner" >> .env
echo "YOUTUBE_API_KEY=your_api_key_here" >> .env
echo "CORS_ORIGIN=http://localhost:5173" >> .env

# Run the server
npm run dev
```
*Service runs on: [http://localhost:5000](http://localhost:5000)*

---

### 3. React Frontend (Client)
The user-facing web application.

```bash
cd frontend

# Install dependencies
npm install

# Create environment variables
echo "VITE_API_URL=http://localhost:5000" > .env

# Start the development server
npm run dev
```
*App runs on: [http://localhost:5173](http://localhost:5173)*

---

## 🔗 Active Links & Endpoints

| Service | Local URL | Cloud URL (If Deployed) | Health Check Endpoint |
|---------|-----------|-------------------------|--------------------------|
| **Frontend** | `http://localhost:5173` | *Your Vercel/Netlify URL* | N/A |
| **Node API Gateway** | `http://localhost:5000` | *Your Render Node URL* | `[GET] /api/health-check` |
| **Python NER** | `http://localhost:8000` | `https://course-recommender-system-py.onrender.com` | `[GET] /` |

---

## 🛠️ Built With

- **Frontend:** [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [Axios](https://axios-http.com/)
- **Node Backend:** [Express.js](https://expressjs.com/), [multer](https://github.com/expressjs/multer) (File parsing), [pdf-parse](https://www.npmjs.com/package/pdf-parse)
- **Python Backend:** [FastAPI](https://fastapi.tiangolo.com/), [spaCy](https://spacy.io/) (NER Engine), [Uvicorn](https://www.uvicorn.org/)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

[MIT](https://choosealicense.com/licenses/mit/)
