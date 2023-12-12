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
    const { mood , userId } = req.body;
    console.log('Received data:', mood, " + ", userId);
    const newUserMood = await Mood.create({
      userId: userId,
      mood: mood,
    });
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
        const userData = {
          userId: user._id,
          username: user.username,
          userType: user.userType,
          userTopic: user.userTopic,
        };

        req.session.user = userData;

        console.log("success to add in session");    
        return res.status(201).json({
          success: true,
          message: 'User logged in successfully',
          user: userData,
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



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
