const mongoose = require("mongoose");
// const slugify = require("slugify");
// const validator = require("validators");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  profilePic: {
    type: String,
  },
});

module.exports = mongoose.model("Users", usersSchema);
