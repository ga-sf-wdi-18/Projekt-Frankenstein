var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/franken_app");

module.exports.User = require("./user");

// module.exports.Story = require("./story");
