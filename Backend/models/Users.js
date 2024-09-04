const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobileNumber: { type: String, unique: true, required: true },
  });

const User = mongoose.model('Userinfo', usersSchema);
module.exports = User;