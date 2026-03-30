# Quick Start - Backend Setup

## 1. Install Dependencies
```bash
cd backend
npm install
```

## 2. Configure `.env` File
Edit `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/portfolio-contacts
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
ADMIN_EMAIL=your_email@gmail.com
```

## 3. Get Gmail App Password
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select Mail + Windows Computer
3. Copy the 16-character password
4. Paste into `EMAIL_PASSWORD` in `.env`

## 4. Start MongoDB
```bash
mongod
# In another terminal window, continue with step 5
```

## 5. Start Backend Server
```bash
npm run dev
```

You should see:
```
✓ MongoDB connected
✓ Server running on http://localhost:5000
✓ Contact API available at http://localhost:5000/api/contact
```

## 6. Test It
Open your portfolio in browser and submit the contact form!

---

**That's it!** Your contact form now has a working backend with email notifications! 🚀
