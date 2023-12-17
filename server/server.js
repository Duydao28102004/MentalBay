const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();
const PORT = 3001;

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
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
