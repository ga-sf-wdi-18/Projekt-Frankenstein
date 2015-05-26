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

var bcrypt = require("bcrypt");

var confirm = function(pswrd, pswrdCon) {
  return pswrd === pswrdCon;
};

userSchema.statics.createSecure = function(params, cb) {
  var isConfirmed;

  isConfirmed = confirm(params.password, params.password_confirmation);

  if (!isConfirmed) {
    return cb("Passwords Should Match", null);
  }

  var that = this;
  //does hash and salting
  bcrypt.hash(params.passsword, 12, function(err, hash) {
    params.passwordDigest = hash;
    that.create(params, cb);
  });
};

userSchema.statics.authenticate = function (params, cb) {
  this.findOne({
      userName: params.userName
    },
    function (err, user) {
      user.checkPswrd(params.password);
    });
};

userSchema.methods.checkPswrd = function(password, cb) {
  var user = this;
  bcrypt.compare(password,
  this.passwordDigest, function (err, isMatch) {
    if (isMatch) {
      cb(null, user);
    } else {
      cb("OOPS", null);
    }
  });
};

var User = mongoose.model("User", userSchema);

module.exports = User;


var User = mongoose.model("User", userSchema);

module.exports = User;
