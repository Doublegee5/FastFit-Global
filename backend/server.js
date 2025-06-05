const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Optional: if you're using a .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Set this in your environment variables
    pass: process.env.EMAIL_PASS  // Use Gmail app password
  }
});

// File to store subscribers
const subscribersFile = path.join(__dirname, 'subscribers.txt');

// Route to handle form submissions
app.post('/subscribe', (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  // Save subscriber email to file
  fs.appendFile(subscribersFile, email + '\n', (err) => {
    if (err) {
      console.error('Error saving subscriber:', err);
      return res.status(500).send('Server error, please try again later');
    }

    // Email confirmation
    const mailOptions = {
      from: `"FastFit Global" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thanks for Subscribing!',
      text: `Hi there!\n\nThank you for subscribing to FastFit Global.\n\nStay tuned for updates! 🚀`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Failed to send confirmation email');
      }
      res.send('✅ Thanks for subscribing! A confirmation email has been sent.');
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
