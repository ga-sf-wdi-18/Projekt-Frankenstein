var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL || "mongodb://localhost/franken_app");

module.exports.User = require("./user");

module.exports.Story = require("./story");
