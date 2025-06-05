const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-app-password' // see note below
  }
});

app.post('/subscribe', (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).send('Email is required');
  }

  // Append the email to a local file
  fs.appendFile('subscribers.txt', email + '\n', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Server error, please try again later');
    }

    // Send confirmation email
    const mailOptions = {
      from: '"FastFit Global" <your-email@gmail.com>',
      to: email,
      subject: 'Subscription Confirmation',
      text: `Thank you for subscribing to FastFit Global! Stay tuned for updates.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Failed to send confirmation email');
      } 
      res.send('Thanks for subscribing! A confirmation email has been sent.');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
