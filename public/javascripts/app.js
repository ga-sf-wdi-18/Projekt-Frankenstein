
$(document).ready(function() {

  // get and render all the story
  Story.all();
  Story.update();
  // // set the view's behaviors
  // View.init();
// View.render();

});


//story non DB JSON version
// var storyOb = [
//   {
//     words : "blee bleee bleee"
//   }
// ];

// // VIEW OBJECT
function View() {}


View.render = function(item) {
var story = item[0].words;
$("#storyWords").append(story);
};

function Story() {}
Story.all = function() {
  $.get("/stories", function(res){
    // remove the quotes from words:
    var story = JSON.parse(res);
    console.log(story);
    // render the
    View.render(story);
  });
};

Story.update = function () {
  $("#update-form").on("submit", function (e) {

    e.preventDefault();
    console.log("form submited");
    var existingStory = $("#storyWords").text();
    console.log(existingStory);
    var storyParams = $(this.words).val();
    console.log(storyParams);
    var newStory = existingStory + storyParams;
    console.log(newStory);
    $.post("/story", {data: newStory}, function (res) {
      console.log(res);
    });

  });
};
