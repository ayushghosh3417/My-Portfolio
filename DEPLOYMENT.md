# Deployment Guide

## Overview

- Frontend: deploy on Vercel
- Backend: deploy on Render
- Database: MongoDB Atlas or another reachable MongoDB instance

## 1. Deploy the Backend on Render

Render can use the `render.yaml` file in the repo root.

Set these environment variables in Render:

- `MONGODB_URI`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `ADMIN_EMAIL`

Render will expose a URL like:

```text
https://your-backend-name.onrender.com
```

Your API base URL will then be:

```text
https://your-backend-name.onrender.com/api
```

## 2. Update the Frontend API URL

Open `api-service.js` and replace the production placeholder URL with your real Render backend URL.

## 3. Deploy the Frontend on Vercel

Import the repository into Vercel and deploy the project root.

Recommended Vercel settings:

- Framework Preset: `Other`
- Root Directory: project root
- Build Command: leave empty
- Output Directory: leave empty

## 4. Final Check

- Open the Vercel site
- Submit the contact form
- Confirm the request reaches your Render backend
- Check your Gmail inbox and the backend logs
