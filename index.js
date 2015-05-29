//required
//behind vars har har har
var express = require("express"),
  bodyParser = require("body-parser"),
  db = require("./models"),
  session = require("express-session"),
  app = express(),
  path = require("path"),
  views = path.join(__dirname, "views"),
  request = require("request");

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

app.use(express.static(__dirname + '/public'));

//body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "SUPER STUFF",
  resave: false,
  saveUninitialized: true
}));

//get requests to the server sending files back (htmlpages)
//serves up landing page
app.get("/", function(req, res) {
  // defines homePath
  var homePath = path.join(views, "login.html");
  //send home page
  res.sendFile(homePath);
});
//servers up story html page
app.get("/story", function(req, res) {
  var storyPath = path.join(views, "story.html");
  res.sendFile(storyPath);
});
//serves up login page
app.get("/login", function(req, res) {
  var loginPath = path.join(views, "login.html");

  res.sendFile(loginPath);
});
//gets story from DB
app.get("/stories", function (req, res) {
  //look for everythign in story (we only have one thing in there)
  db.Story.find({}, function (err, results) {
    console.log(results);
    //convert results to JSON string
    res.send(JSON.stringify(results));
  });
});
//server the regitration page
app.get("/register", function(req, res) {
  var registerPath = path.join(views, "register.html");
  res.sendFile(registerPath);
});
//server profile page
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
//calls logout function from loginhelper middleware and redirects to landing
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});
//api req to giphy does nothing atm
app.get('/top_gif', function(req, res){

  console.log("Requesting data from giphy");
  request.get({
    uri: "http://api.giphy.com/v1/gifs/trending",
    qs: {
      limit: 1,
      api_key: "dc6zaTOxFJmzC"
    }
  }, function(err, apiRes, apiBody){

      if (err) {
        console.log("error for Giphy.");
        res.send("There was an error");
      }

      console.log("Giphy api res");
      var body = JSON.parse(apiRes.body);

      console.log("Grabbing the top trending gif");
      res.send("<img src='" + body.data[0].images.original.url + "'>");

  });

});
//login request to server takes you to story on success
app.post("/login", function(req, res) {
  var user = req.body.user;
  console.log(user);
  db.User.
  authenticate(user, function(err, user) {
    console.log(user);
    //if you exist proceed to story
    if (user) {
      console.log("LOGGING IN");
      req.login(user);
      res.redirect("/story");
      //else get made son
    } else {
      console.log("failed to login");
      res.redirect("/login");
    }
  });
});
//posting to users for acc creation
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
//postint to story database this was a pain... THE PAIN!!!!
app.post("/story", function (req, res) {
  console.log(req.body);
  var newStory = req.body.data;
  //finally got the data
  console.log("received newStory", newStory);
  //update the story.words with sent data
  db.Story.findByIdAndUpdate({_id:"55675ef128d1c9b010993296"}, {words: newStory}, {new:true}, function (err, story) {
    console.log(story);
    res.send(story);
  });
});
//heroku sorcery!
app.listen(process.env.PORT || 3000, function() {
  console.log("Running!");
});
