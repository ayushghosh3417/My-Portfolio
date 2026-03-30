// API Service for Contact Form
const LOCAL_API_BASE_URL = 'http://localhost:5000/api';
const PROD_API_BASE_URL = 'https://your-backend-name.onrender.com/api';
const API_BASE_URL = ['localhost', '127.0.0.1'].includes(window.location.hostname)
    ? LOCAL_API_BASE_URL
    : PROD_API_BASE_URL;

async function sendContactMessage(name, email, subject, message) {
    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, subject, message })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send message');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof TypeError) {
            if (API_BASE_URL === LOCAL_API_BASE_URL) {
                throw new Error('Cannot reach the backend server. Start the backend on http://localhost:5000 and try again.');
            }
            throw new Error('Cannot reach the deployed backend. Update api-service.js with your live backend URL and redeploy.');
        }
        throw error;
    }
}
