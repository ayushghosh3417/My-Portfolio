const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const emailPort = Number(process.env.EMAIL_PORT) || 587;
const hasValidEmailConfig =
    process.env.EMAIL_HOST &&
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASSWORD &&
    process.env.ADMIN_EMAIL &&
    process.env.EMAIL_USER !== 'your_email@gmail.com' &&
    process.env.EMAIL_PASSWORD !== 'your_app_password' &&
    process.env.ADMIN_EMAIL !== 'your_email@gmail.com';

// Configure email transporter
const transporter = hasValidEmailConfig
    ? nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: emailPort,
        secure: emailPort === 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        socketTimeout: 5000
    })
    : null;

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
exports.submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate input
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create contact message in database
        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        // Send email notification to admin
        if (transporter) {
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: process.env.ADMIN_EMAIL,
                    replyTo: email,
                    subject: `New Portfolio Contact: ${subject}`,
                    html: `
                        <h2>New Contact Message</h2>
                        <p><strong>From:</strong> ${name} (${email})</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                        <p style="color: #999; font-size: 12px; margin-top: 20px;">Received on: ${new Date().toLocaleString()}</p>
                    `
                });

                // Send confirmation email to user
                await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: email,
                    subject: 'Thank you for contacting me!',
                    html: `
                        <h2>Message Received</h2>
                        <p>Thank you for reaching out, ${name}!</p>
                        <p>I have received your message and will get back to you as soon as possible.</p>
                        <p style="margin-top: 20px;"><strong>Your message:</strong></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                        <p style="color: #999; font-size: 12px; margin-top: 20px; border-top: 1px solid #ccc; padding-top: 10px;">Best regards</p>
                    `
                });
            } catch (emailErr) {
                console.error('Email sending failed:', emailErr.message);
                // Continue even if email fails - message is saved to database
            }
        } else {
            console.warn('Email sending skipped: missing or placeholder email configuration.');
        }

        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully!'
        });
    } catch (err) {
        console.error('Contact submission error:', err);
        res.status(500).json({ error: err.message || 'Error submitting contact form' });
    }
};

// @route   GET /api/contact
// @desc    Get all contact messages (for admin)
// @access  Public (can be protected later)
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json({
            count: messages.length,
            messages
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
