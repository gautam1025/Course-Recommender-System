from fastapi import FastAPI
from pydantic import BaseModel
import spacy
import en_core_web_sm

# Load NLP model (English small for demo)
nlp = spacy.load("en_core_web_sm")

app = FastAPI()

class ResumeText(BaseModel):
    text: str

@app.post("/ner")
def analyze_resume(data: ResumeText):
    doc = nlp(data.text)

    profile = {
        "skills": [],
        "job_titles": [],
        "companies": [],
        "degrees": [],
        "experience_years": []
    }

    # Simple rules (can be extended later)
    for ent in doc.ents:
        if ent.label_ in ["ORG"]:
            profile["companies"].append(ent.text)
        if ent.label_ in ["PERSON", "WORK_OF_ART"]:  # demo for job titles
            profile["job_titles"].append(ent.text)
        if ent.label_ in ["DATE"]:
            if "year" in ent.text.lower():
                profile["experience_years"].append(ent.text)

    # Skills matching with a list (example: Python, Java, SQL, etc.)
    known_skills = ["python", "java", "sql", "machine learning", "deep learning", "html", "css", "javascript"]
    text_lower = data.text.lower()
    for skill in known_skills:
        if skill in text_lower:
            profile["skills"].append(skill)

    # Degree extraction (simple keywords)
    degrees = ["b.tech", "m.tech", "bachelor", "master", "phd"]
    for d in degrees:
        if d in text_lower:
            profile["degrees"].append(d)

    return profile

@app.get("/")
def root():
    return {"message": "NER Service running"}