const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Mood = require('./models/Mood');
const User = require('./models/User');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3001; // Choose the port you want to use

app.use(bodyParser.json());
app.use(cors());

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
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
