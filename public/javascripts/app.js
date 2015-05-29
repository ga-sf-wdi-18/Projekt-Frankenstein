
$(document).ready(function() {

  Story.all();
  Story.update();


});



function View() {}

//render story function
View.render = function(item) {
var story = item[0].words;
$("#storyWords").empty().append(story);
};

function Story() {}
Story.all = function() {
  $.get("/stories", function(res){
    // remove the quotes from words:
    var story = JSON.parse(res);
    console.log(story);
    // render the story call back
    View.render(story);
  });
};
//update the story request
Story.update = function () {
  $("#update-form").on("submit", function (e) {

    e.preventDefault();
    console.log("form submited");
    //take current story content
    var existingStory = $("#storyWords").text();
    console.log(existingStory);
    //get user story input
    var storyParams = $(this.words).val();
    console.log(storyParams);
    //add story input to end of existingStory
    var newStory = existingStory + storyParams;
    console.log(newStory);
    //send it to story
    $.post("/story", {data: newStory}, function (res) {
      console.log(res);
      //reset the text area
      $("#update-form")[0].reset();
      //call story.all
      Story.all();
    });

  });
};
