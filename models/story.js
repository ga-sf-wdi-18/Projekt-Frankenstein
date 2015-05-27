var mongoose = require("mongoose");
//posting to this will update story content
var storySchema = new mongoose.Schema({
  words: {type: String}
});

var Story = mongoose.model("Story", storySchema);

module.exports = Story;
