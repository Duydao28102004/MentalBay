const mongoose = require('mongoose');
const today = new Date().toISOString().split('T')[0];

const articleSchema = new mongoose.Schema({
  createDate: {type: String, default: today},
  title: {type: String, required: true,},
  description: {type: String, required: true,},
  topic: {type: String, required: true,},
  detail: {type: String, required: true,},
  base64Image: {type: String, required: false,},
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;