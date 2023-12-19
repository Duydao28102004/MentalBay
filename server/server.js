const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000", // Update with your React app's URL
      methods: ["GET", "POST"]
    }
  });

const PORT = 3001;

const Chat = require('./models/Chat');
const Mood = require('./models/Mood');
const User = require('./models/User');
const Article = require('./models/Article');
const Podcast = require('./models/Podcast');


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
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

app.get('/api/doctors', async (req, res) => {
    try {
      const doctors = await User.find({ userType: 'doctor' });
      res.json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/create-chat-room', async (req, res) => {
  try {
    const { doctorname, username } = req.body;
    const chatname = doctorname + username;

    // Check if the chat room already exists
    const existingChat = await Chat.findOne({ room: chatname });

    if (existingChat) {
      // If the chat room exists, respond with the existing room
      res.json({ room: chatname });
    } else {
      // If the chat room doesn't exist, create one
      await Chat.create({ room: chatname, user: username, doctor: doctorname, messages: [] });
      res.json({ room: chatname });
    }
  } catch (error) {
    console.error('Error creating or finding chat room:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/chats/:doctor', async (req, res) => {
  try {
    const doctorname = req.params.doctor;

    // Use a regular expression to find rooms that contain the specified doctorname
    const chats = await Chat.find({ doctor: doctorname });

    // Extract room and user information from each chat
    const chatInfo = chats.map(chat => ({
      room: chat.room,
      user: chat.user,
    }));

    res.json({ chatInfo });
  } catch (error) {
    console.error('Error retrieving chats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/createarticle', async (req, res) => {
  try {
    const newArticle = await Article.create(req.body);

    await newArticle.save();

    res.status(201).json({ message: 'Article created successfully', article: newArticle });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/article', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getarticles/:articleId', async (req, res) => {
  const { articleId } = req.params;

  try {
    const article = await Article.findById(articleId);
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/createpodcast', async (req, res) => {
  try {
    const newPodcast = await Podcast.create(req.body);

    await newPodcast.save();

    res.status(201).json({ message: 'Podcast created successfully', podcast: newPodcast });
  } catch (error) {
    console.error('Error creating podcast:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/podcast', async (req, res) => {
  try {
    const podcasts = await Podcast.find();
    res.json(podcasts);
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getpodcast/:podcastId', async (req, res) => {
  const { podcastId } = req.params;

  try {
    const podcast = await Podcast.findById(podcastId);
    
    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }

    res.json(podcast);
  } catch (error) {
    console.error('Error fetching podcast:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/gettodaymood/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const today = new Date().toISOString().split('T')[0];
    console.log(today);
    const todayMood = await Mood.findOne({userId: userId, date: today});
    console.log(todayMood);
    if (todayMood) {
      res.json(todayMood);
    } else {
      res.json(null);
    }
  } catch (error) {
    console.error('Error fetching mood:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

io.on('connection', (socket) => {

  // Handle room joining with a username
  socket.on('join room', ({ room, username }) => {
    socket.join(room);

    // Retrieve chat history from the database and emit it to the user
    Chat.findOne({ room })
      .then((chat) => {
        if (chat) {
          const chatHistory = chat.messages;
          socket.emit('chat history', chatHistory);
        }
      })
      .catch((error) => {
        console.error('Error retrieving chat history:', error);
      });

    io.to(room).emit('room joined', { room, username });
  });

  // Handle chat messages with a username
  socket.on('chat message', async ({ message, room, username }) => {
    // Save the message to the database
    try {
      const chat = await Chat.findOne({ room });
      if (chat) {
        chat.messages.push({ username, message });
        await chat.save();
      } else {
        await Chat.create({ room, messages: [{ username, message }] });
      }
    } catch (error) {
      console.error('Error saving chat message:', error);
    }

    io.to(room).emit('chat message', { message, username });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});