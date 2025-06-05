const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

// Subscription endpoint
const subscribersFile = path.join(__dirname, 'subscribers.txt');

app.post('/subscribe', (req, res) => {
  const email = req.body.email;
  if (!email) return res.status(400).send('Email is required');

  fs.appendFile(subscribersFile, email + '\n', (err) => {
    if (err) return res.status(500).send('Server error writing to file');

    const mailOptions = {
      from: `"FastFit Global" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Subscription Confirmation',
      text: `Thank you for subscribing to FastFit Global! Stay tuned for updates.`
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(500).send('Failed to send email');
      res.send('Thanks for subscribing! A confirmation email has been sent.');
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
