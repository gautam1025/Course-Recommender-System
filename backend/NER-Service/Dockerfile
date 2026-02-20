FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.7.1/en_core_web_sm-3.7.1-py3-none-any.whl

COPY . .

# Expose port (default FastAPI)
EXPOSE 8000

# Start Uvicorn without reload
CMD ["uvicorn", "ner_service:app", "--host", "0.0.0.0", "--port", "8000"]
