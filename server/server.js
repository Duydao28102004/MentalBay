const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 3001; // Choose the port you want to use

app.use(bodyParser.json());
app.use(cors());

app.post('/api/mood', (req, res) => {
  const { mood } = req.body;

  // Handle the mood as needed
  console.log('Received mood:', mood);

  // Respond with a simple message
  res.json({ message: 'Mood received successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
