const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Mood = require('./models/Mood');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();
const PORT = 3001; // Choose the port you want to use

app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

app.post('/api/mood', async (req, res) => {
  try {
    const { mood } = req.body;

    // Handle the mood as needed
    console.log('Received mood:', mood);

    // Example usage to save user mood
    const newUserMood = new Mood({
      userId: 'user123',
      mood: mood,
    });

    // Respond with a simple message
    res.json({ message: 'Mood received successfully!' });
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create a new user
    const user = await User.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        console.log("Successfully logged in");
        req.session.user = {
          username,
          userType,
          userTopic,
        };  
        console.log("success to add in session");    
        return res.status(201).json({
          success: true,
          message: 'User logged in successfully',
        });
      } else {
        return res.status(401).json({ error: 'Wrong password' });
      }
    } else {
      return res.status(401).json({ error: 'Wrong username' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/userdata', (req, res) => {
  // Check if the user is logged in
  if (req.session.user) {
    // User is logged in, send user data
    const userData = req.session.user;
    res.json(userData);
  } else {
    // User is not logged in
    res.status(401).json({ error: 'Unauthorized' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
