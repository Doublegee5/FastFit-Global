// server.js
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Example contact form endpoint (optional)
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Setup mail transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,    // Your email
        pass: process.env.EMAIL_PASS     // Your email password or App Password
      }
    });

    // Email content
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,       // Receiving email
      subject: `Contact from ${name}`,
      text: message
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// Fallback to serve index.html on unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
