const {Schema, model} = require("../db/connection"); // import Schema & model

// User Schema
const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    userType: {type: String, required: true},
    userTopic: {type: String, required: false},
});

// User model
const User = model("User", UserSchema);

module.exports = User;