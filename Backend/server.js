const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded bodies (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from your frontend (optional)
// Adjust if your frontend files are in a 'public' folder
app.use(express.static(path.join(__dirname, '../public')));

// POST endpoint to receive email subscription
app.post('/subscribe', (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  // Append the email to a local file 'subscribers.txt'
  fs.appendFile('subscribers.txt', email + '\n', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Server error, please try again later');
    }
    res.send('Thanks for subscribing!');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
