var express = require("express"),
  bodyParser = require("body-parser"),
  db = require("./models"),
  sessions = require("express-session"),
  path = require("path");

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

var views = path.join(__dirname, "views");
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

app.get("/profile", function (req, res) {
  res.send("Coming Soonish");
});
//post request to server
app.post("/login", function(req, res) {
  var user = req.body.user;

  db.User.
  authenticate(user,
    function(err, user) {
      if (!err) {
        res.redirect("/profile");
      } else {
        res.redirect("/login");
      }
    });
});

app.post("/users", function(req, res) {
  var newUser = req.body.user;
  db.User.
  createSecure(newUser, function(err, user) {
    if (user) {
      res.send(user);
    } else {
      res.redirect("/register");
    }
  });
});

app.listen(3000, function() {
  console.log("Running!");
});
