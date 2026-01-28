# 🚀 Deployment Guide

Since this is a **Full Stack Application** with three distinct parts (React Frontend, Node Backend, Python Microservice), the best "beginner-friendly" way to deploy is to use **Vercel** for the frontend and **Render** for the backends.

This guide assumes you have pushed your code to **GitHub**.

---

## Part 1: Deploy Frontend (Vercel)

1.  Go to [Vercel.com](https://vercel.com) and **Add New Project**.
2.  Import your GitHub repository.
3.  **Configure Project**:
    -   **Root Directory**: Click "Edit" and select `frontend`.
    -   **Framework Preset**: It should auto-detect "Vite".
    -   **Environment Variables**:
        -   Add `VITE_API_URL` and set it to your Node Backend URL (You will update this *after* deploying the backend, step 2). initially, you can leave it empty or put a placeholder.
4.  Click **Deploy**.

---

## Part 2: Deploy Backends (Render)

Go to [Render.com](https://render.com) and create an account.

### A. Python NER Service
1.  Click **New +** -> **Web Service**.
2.  Connect your GitHub repo.
3.  **Settings**:
    -   **Name**: `course-ner-service`
    -   **Root Directory**: `backend/NER-Service`
    -   **Runtime**: Python 3
    -   **Build Command**: `pip install -r requirements.txt`
    -   **Start Command**: `python -m uvicorn ner_service:app --host 0.0.0.0 --port $PORT`
4.  Click **Create Web Service**.
5.  **Copy the URL** provided (e.g., `https://course-ner-service.onrender.com`).

### B. Node.js API Gateway
1.  Click **New +** -> **Web Service**.
2.  Connect the *same* GitHub repo.
3.  **Settings**:
    -   **Name**: `course-api-gateway`
    -   **Root Directory**: `backend/node`
    -   **Runtime**: Node
    -   **Build Command**: `npm install`
    -   **Start Command**: `node server.js`
    -   **Environment Variables**:
        -   Key: `NLP_SERVICE_URL`
        -   Value: Paste the Python Service URL from Step A (e.g., `https://course-ner-service.onrender.com`)
        -   Key: `PORT`
        -   Value: `5000` (Optional, Render handles port automatically usually)
4.  Click **Create Web Service**.
5.  **Copy the URL** provided (e.g., `https://course-api-gateway.onrender.com`).

---

## Part 3: Connect Frontend to Backend

1.  Go back to your **Vercel Dashboard** > Frontend Project > **Settings** > **Environment Variables**.
2.  Add/Edit `VITE_API_URL`.
3.  Set the value to your **Node API Gateway URL** (from Part 2B).
    -   *Example*: `https://course-api-gateway.onrender.com` (Ensure no trailing slash if your code adds it).
4.  Go to **Deployments** tab and **Redeploy** the latest commit for changes to take effect.

---

## ✅ Deployment Complete!
Your app is now live with:
-   **Frontend** on Vercel (Fast, Global CDN)
-   **Backends** on Render (Free tier, auto-sleeps on inactivity)
