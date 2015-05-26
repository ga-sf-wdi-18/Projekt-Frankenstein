var mongoose = require("mongoose"),
    bcrypt = require("bcrypt");

    var userSchema = new mongoose.Schema({
      userName: String,
      passwordDigest: String
    });

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
  // does hash and salting
  bcrypt.hash(params.password, 7, function(err, hash) {
    params.passwordDigest = hash;
    that.create(params, cb);
  });
};

userSchema.statics.authenticate = function (params, cb) {
  this.findOne({
      userName: params.userName
    },
    function (err, user) {
      //if user is null otherwise
      if (!user) {
        console.log("user not found");
        cb(err, null);
      } else {
        user.checkPswrd(params.password, cb);
        console.log(user);
      }
      //do not need to check pw of non existant user
    });
};

userSchema.methods.checkPswrd = function(password, cb) {
  var user = this;
  bcrypt.compare(password,
  this.passwordDigest, function (err, isMatch) {
    if (isMatch) {
        console.log("password matches");
      cb(null, user);
    } else {
      console.log("password not a Match");
      cb("OOPS", null);
    }
  });
};

var User = mongoose.model("User", userSchema);

module.exports = User;
