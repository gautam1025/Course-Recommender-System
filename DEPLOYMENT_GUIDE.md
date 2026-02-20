# 🚀 Beginner-Friendly Deployment Guide

This guide will walk you through deploying your **Course Recommender System** for free using **Render** (for the backends) and **Vercel** (for the frontend). 

Since your project is split into three parts (Python AI Service, Node API Gateway, React Frontend), we will deploy them one by one in that order, because each part depends on the one before it.

---

## Prerequisites (Do this first!)
1. Make sure all your recent changes are committed and pushed to your **GitHub repository**.
2. Create a free account on [Render](https://render.com/).
3. Create a free account on [Vercel](https://vercel.com/).

---

## Step 1: Deploy the Python NER Service (Render)

This service extracts skills from the resume. It has no dependencies, so we deploy it first.

1. Go to your **Render Dashboard** and click **New +** -> **Web Service**.
2. Select **Build and deploy from a Git repository**.
3. Connect your GitHub account and select your `Course-Recommender-System` repository.
4. Fill in the deployment details exactly like this:
   - **Name**: `course-ner-service` (or whatever you like)
   - **Region**: Select the one closest to you (e.g., Frankfurt or Oregon).
   - **Branch**: `main` (or `master`)
   - **Root Directory**: `backend/NER-Service` *(This is crucial!)*
   - **Environment**: Docker *(Render should detect this automatically because we added a Dockerfile)*
   - **Instance Type**: Free
5. Click **Create Web Service**.
6. **Wait for it to build.** Once it says "Live", look near the top left for your new URL (it will look like `https://course-ner-service-abcd.onrender.com`).
7. **🟢 SAVE THIS URL!** You will need it for the next step.

---

## Step 2: Deploy the Node.js Backend (Render)

This is the main API that talks to the frontend and the Python service.

1. Go back to your **Render Dashboard** and click **New +** -> **Web Service**.
2. Connect the same `Course-Recommender-System` GitHub repository.
3. Fill in the deployment details exactly like this:
   - **Name**: `course-node-gateway`
   - **Region**: Select the **same region** you chose for the Python service.
   - **Branch**: `main`
   - **Root Directory**: `backend/node` *(This is crucial!)*
   - **Environment**: Docker
   - **Instance Type**: Free
4. Scroll down and click on **Advanced**.
5. Click **Add Environment Variable** and add these two:
   - **Key**: `NER_API_URL`
   - **Value**: Paste the URL you saved from Step 1, and add `/ner` at the end. *(e.g., `https://course-ner-service-abcd.onrender.com/ner`)*
   - **Key**: `YOUTUBE_API_KEY`
   - **Value**: Your actual YouTube API key.
6. Click **Create Web Service**.
7. **Wait for it to build.** Once it says "Live", look near the top left for your new URL (e.g., `https://course-node-gateway-wxyz.onrender.com`).
8. **🟢 SAVE THIS URL!** You will need it for the final step.

---

## Step 3: Deploy the React Frontend (Vercel)

This is the user interface that people will actually visit.

1. Log in to your **Vercel Dashboard** and click **Add New** -> **Project**.
2. Import your `Course-Recommender-System` GitHub repository.
3. In the configuration screen, fill in the details:
   - **Project Name**: `course-recommender` (or whatever you want your final website name to be)
   - **Framework Preset**: Vite
   - **Root Directory**: Click the "Edit" button and select `frontend`.
4. Open the **Environment Variables** dropdown and add:
   - **Key**: `VITE_API_URL`
   - **Value**: Paste the URL you saved from Step 2. *(e.g., `https://course-node-gateway-wxyz.onrender.com`)*. **Make sure there is NO trailing slash `/` at the end.**
5. Click **Deploy**.
6. Wait 1-2 minutes for Vercel to build the site.
7. Once finished, Vercel will give you the live URL (e.g., `https://course-recommender.vercel.app`).

---

## 🎉 You're Done!
Go to the Vercel URL, upload a resume, and test the full live system. You can now put this Vercel link directly on your resume!

**Note on Render's Free Tier**: If nobody visits your site for 15 minutes, Render puts the backends to "sleep". When the next person visits, it takes about 30-50 seconds to "wake up". This is normal for free hosting!
