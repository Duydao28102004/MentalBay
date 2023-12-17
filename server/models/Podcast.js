const mongoose = require('mongoose');
const today = new Date().toISOString().split('T')[0];

const podcastSchema = new mongoose.Schema({
  createDate: {type: String, default: today},
  title: {type: String, required: true,},
  description: {type: String, required: true,},
  topic: {type: String, required: true,},
  link: {type: String, required: true,},
  detail: {type: String, required: true,},
  base64Image: {type: String, required: false,},
});

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;