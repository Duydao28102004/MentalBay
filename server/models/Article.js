const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {type: String, required: true,},
  description: {type: String, required: true,},
  topic: {type: String, required: true,},
  detail: {type: String, required: true,},
  base64Image: {type: String, required: false,},
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;