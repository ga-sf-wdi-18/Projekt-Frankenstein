//required
var express = require("express"),
  bodyParser = require("body-parser"),
  db = require("./models"),
  session = require("express-session"),
  path = require("path");

var app = express(),
  views = path.join(__dirname, "views");

//middleware for express
var loginHelpers = function(req, res, next) {

  req.login = function(user) {
    req.session.userId = user._id;
    req.user = user;
    return user;
  };

  req.logout = function() {
    req.session.userId = null;
    req.user = null;
  };

  req.currentUser = function(cb) {
    var userId = req.session.userId;
    db.User.
    findOne({
      _id: userId
    }, cb);
  };

  // careful to have this
  next(); // real important
};

app.use(loginHelpers);

//app dot use
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "SUPER STUFF",
  resave: false,
  saveUninitialized: true
}));

//get requests to the server sending files back (htmlpages)
app.get("/", function(req, res) {
  var homePath = path.join(views, "login.html");
  res.sendFile(homePath);
});

app.get("/story", function(req, res) {
  var storyPath = path.join(views, "story.html");
  res.sendFile(storyPath);
});

app.get("/login", function(req, res) {
  var loginPath = path.join(views, "login.html");

  res.sendFile(loginPath);
});

app.get("/register", function(req, res) {
  var registerPath = path.join(views, "register.html");
  res.sendFile(registerPath);
});

app.get("/profile", function(req, res) {
  req.currentUser(function(err, user) {
    if (user) {
      res.send(user.userName);
      console.log(user);
    } else {
      res.redirect("/login");
    }
  });
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});
//post request to server
app.post("/login", function(req, res) {
  var user = req.body.user;
  db.User.
  authenticate(user, function(err, user) {
    console.log(user);
    if (user) {
      console.log("LOGGING IN");
      req.login(user);
      res.redirect("/profile");
    } else {
      console.log("failed to login");
      res.redirect("/login");
    }
  });
});

app.post("/user", function(req, res) {
  var newUser = req.body.user;
  console.log(newUser);
  db.User.
  createSecure(newUser, function(err, user) {
    if (user) {
      req.login(user);
      res.redirect("/profile");
    } else {
      res.redirect("/register");
    }
  });
});

app.listen(3000, function() {
  console.log("Running!");
});
