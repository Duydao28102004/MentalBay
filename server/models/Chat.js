// models/Chat.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  room: String,
  user: String,
  doctor: String,
  messages: [
    {
      username: String,
      message: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
