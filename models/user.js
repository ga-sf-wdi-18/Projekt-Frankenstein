var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  userName: {
    type: String,
    lowercase: true,
    required: true,
    index: {
      unique: true
    }
  },
  passwordDigest: {
    type: String,
    required: true
  }
});

var User = mongoose.model("User", userSchema);

module.exports = User;
