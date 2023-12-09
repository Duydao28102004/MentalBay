const {Schema, model} = require("../db/connection") // import Schema & model
const today = new Date().toISOString().split('T')[0];

const MoodSchema = new Schema({
    userId: {type: String, require: true},
    mood: {type: String, require: true},
    date: {type: String, default: today},
});


const Mood = model("Mood", MoodSchema);

module.exports = Mood;