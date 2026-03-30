# Backend Setup Guide - Contact Form Only

This is a minimal backend server for handling your portfolio contact form submissions with email notifications.

## Prerequisites

- Node.js (v14+)
- MongoDB (local or MongoDB Atlas)
- Gmail account with app password

## Quick Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Edit `backend/.env` with your settings:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio-contacts

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@yourportfolio.com
ADMIN_EMAIL=your_email@gmail.com
```

### 3. Gmail Setup (for email notifications)

1. Enable 2-Factor Authentication on your Google account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer"
4. Copy the generated 16-character password
5. Paste it in `EMAIL_PASSWORD` in `.env`

### 4. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create free account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- Get your connection string and update `MONGODB_URI` in `.env`

### 5. Start the Backend

```bash
npm run dev    # Development mode with auto-reload
# or
npm start      # Production mode
```

Server will start at `http://localhost:5000`

## API Endpoints

### Submit Contact Form
```
POST /api/contact

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Interested in collaboration",
  "message": "Hi, I would like to work with you..."
}

Response:
{
  "success": true,
  "message": "Your message has been sent successfully!"
}
```

### Get All Messages
```
GET /api/contact

Response:
{
  "count": 5,
  "messages": [...]
}
```

### Health Check
```
GET /api/health

Response:
{
  "status": "Backend is running!",
  "timestamp": "2026-03-30T..."
}
```

## How It Works

1. **User submits form** on the portfolio website
2. **Frontend sends POST request** to `http://localhost:5000/api/contact`
3. **Backend validates** the data
4. **Saves to MongoDB** for record-keeping
5. **Sends email to you** with the message
6. **Sends confirmation email** to the user
7. **Returns success** to frontend

## Files Structure

```
backend/
├── server.js              # Express server
├── .env                   # Configuration
├── package.json           # Dependencies
├── models/
│   └── Contact.js         # MongoDB Contact schema
├── controllers/
│   └── contactController.js  # Business logic
└── routes/
    └── contact.js         # API routes
```

## Testing the API

### Using curl
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message with more than 10 characters"
  }'
```

### Using Postman
1. Create POST request to `http://localhost:5000/api/contact`
2. Set header: `Content-Type: application/json`
3. Set body (JSON):
```json
{
  "name": "Your Name",
  "email": "your@email.com",
  "subject": "Your Subject",
  "message": "Your message here..."
}
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection error | Ensure mongod is running or check MongoDB Atlas connection string |
| Emails not sending | Verify Gmail app password and 2FA enabled |
| Port 5000 already in use | Change `PORT` in `.env` file |
| CORS errors | Ensure backend is running when testing from frontend |

## Frontend Integration

The frontend automatically sends to `http://localhost:5000/api/contact` when the contact form is submitted.

To change this URL, edit `api-service.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api'; // Change this
```

## Database

Contacts are stored in MongoDB collection: `contacts`

Each document contains:
- `name` - Sender's name
- `email` - Sender's email
- `subject` - Message subject
- `message` - Message content
- `createdAt` - Timestamp

View all messages:
```bash
GET http://localhost:5000/api/contact
```

## Deployment

When deploying:
1. Use production MongoDB (MongoDB Atlas)
2. Use real email credentials
3. Set `NODE_ENV=production`
4. Use environment-specific `.env` file
5. Deploy to Heroku, Railway, or similar platform

## Support

If you encounter issues:
1. Check the error message in terminal
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running
4. Test API with curl/Postman before testing from frontend
