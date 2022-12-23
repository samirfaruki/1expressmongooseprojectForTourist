const mongoose = require("mongoose");
// const slugify = require("slugify");
const validator = require("validator");

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
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },

  profilePic: {
    type: String,
  },
});

module.exports = mongoose.model("Users", usersSchema);
