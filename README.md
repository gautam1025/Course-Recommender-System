Career & Course Recommendation System: 
React, Node.js, Python, FastAPI, MongoDB, spaCy

A resume-driven recommendation engine that provides personalized course suggestions and career roadmaps to help users achieve their professional goals, whether it's upskilling in their current domain or switching to a new one.

[Live Demo Link] (to be added soon....)

🚀 Key Features

    📄 Automated Resume Parsing: Upload a resume in PDF format and have it automatically parsed.
    🧠 Intelligent Skill Extraction: A spaCy-based NLP service extracts key information like skills, job titles,experience, and degrees.
    🎯 Context-Aware Recommendations: The engine provides different suggestions based on user goals:
        . Upskill: Recommends courses that build upon existing skills (relevance-based).
        . Domain Switch: Suggests foundational courses for a new career path (novelty-based).
    📚 Multi-Source Course Aggregation: Dynamically fetches courses from Udemy, Coursera, and YouTube APIs with a static JSON fallback for reliability.
    🗺️ Structured Career Roadmaps: Provides a step-by-step learning path for popular career tracks like Data Science and Full Stack Development.
    📊 Interactive Dashboard: A clean, modern UI built with React to visualize the user's extracted profile, recommended courses, and career path progress.



🏛️ Technical Architecture

    This project is built using a microservice architecture to separate concerns and ensure scalability. The system is composed of two main backend services:

    Node.js / Express.js (API Gateway): The primary backend that handles user requests, manages data aggregation from course APIs, and communicates with the NLP service.
    Python / FastAPI (NLP Service): A specialized microservice dedicated to the computationally intensive task of parsing PDFs and performing Named Entity Recognition (NER) with spaCy.
    This design allows the core application to remain fast and responsive while offloading heavy processing to a service built with the best tools for the job (Python's data science ecosystem).


                +----------------+      +-------------------------+      +-----------------------------+
                |                |      |                         |      |                             |
                |  React Client  |----->|   Node.js API Gateway   |----->|  Python/FastAPI NLP Service |
                | (Frontend)     |      |    (Express.js)         |      |    (spaCy for NER)          |
                |                |      |                         |      |                             |
                +----------------+      +-----------+-------------+      +-----------------------------+
                                                    |
                                                    |
                                                    v
                                        +---------------------+
                                        |                     |
                                        |      MongoDB        |
                                        |     (Database)      |
                                        |                     |
                                        +---------------------+


⚙️ How It Works

    1. Resume Upload: The user uploads their resume via the React frontend.
    2. Text Extraction: The Node.js backend receives the file, extracts raw text using pdf-parse, and sends it to the NLP service.
    3. NLP Processing: The FastAPI service uses a custom spaCy NER model to process the text and returns a structured JSON object containing extracted skills, degrees, job titles, etc.
    4. Course Aggregation: The Node.js backend fetches course data from various APIs (Udemy, Coursera, YouTube), normalizes it into a common schema, and caches it.
    5. Recommendation Engine: Based on the user's profile and stated goal (upskill/domain switch), the engine scores and ranks the available courses.
    6. Dashboard Display: The final ranked courses and a relevant career roadmap are sent to the React frontend to be displayed on the user's personalized dashboard.

🛠️ Tech Stack

    Category	            |    Technologies
    ________________________|__________________________________
    Frontend	            |    React.js, TailwindCSS, Axios
    Backend (API Gateway)	|    Node.js, Express.js
    Backend (NLP Service)	|    Python, FastAPI, spaCy
    Database	            |    MongoDB
    DevOps & Tools	        |    Git, GitHub, Multer, pdf-parse

Local Setup & Installation

    To run this project locally, follow these steps:

    1. Prerequisites
        . Node.js (v14 or higher)
        . Python (v3.8 or higher)
        . MongoDB instance (local or cloud)
        . Git

    2. Clone the Repository

        git clone https://github.com/your-username/your-repo-name.git
        cd your-repo-name

    3. Backend Setup
    
        a. API Gateway (Node.js)
            # Navigate to the server directory
            cd server
            # Install dependencies
            npm install
            # Create a .env file and add your environment variables
            touch .env

        .env Example:

            MONGO_URI=your_mongodb_connection_string
            PORT=5000
            NLP_SERVICE_URL=http://localhost:8000
            UDEMY_API_KEY=your_udemy_api_key
            COURSERA_API_KEY=your_coursera_api_key

        b. NLP Service (Python)

            # Navigate to the NLP service directory
            cd nlp-service

            # Create a virtual environment and activate it
            python -m venv venv
            source `venv\Scripts\activate` 

            # Install dependencies
            pip install -r requirements.txt

            # Download the spaCy model (if you have a custom one, add instructions here)
            # python -m spacy download en_core_web_sm

    4. Frontend Setup

        # Navigate to the client directory
        cd client

        # Install dependencies
        npm install

        # Create a .env file if you need to specify the API URL
        # REACT_APP_API_URL=http://localhost:5000

    5. Run the Application

        i. Start the NLP Service:

            cd backend/NER_Service
            python -m uvicorn ner_service:app --reload --port 8000

        ii. Start the Backend API Gateway:

            cd backend/node
            node server.js

        iii. Start the Frontend Development Server:

            npm run dev

    The application should now be running on http://localhost:5173.

📈 Future Enhancements

    1. User Accounts: Implement user authentication to save session data and track learning progress.
    2. Advanced ML Models: Integrate sentence transformers (e.g., BERT) for more contextually aware skill matching and course recommendation.
    3. Expand Data Sources: Add more course providers like LinkedIn Learning, edX, and Pluralsight.
    4. Job Recommendations: Integrate with a job board API (like LinkedIn or Indeed) to recommend relevant job openings based on the user's profile and newly acquired skills.
    
📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
