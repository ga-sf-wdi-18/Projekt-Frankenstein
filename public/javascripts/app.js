
$(document).ready(function() {

  // get and render all the story
  Story.all();
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
// View.init = function() {
//   // story content submit event listener
//   $("#story-content").on("change", function(e){
//     // stop page reload
//     e.preventDefault();
//     // send a update request to story in db
//     Story.update(storyParams);
//   });
// };

View.render = function(item) {
var story = item[0].words;
$("#storyWords").append(story);
};

function Story() {}
Story.all = function() {
  $.get("/story:id", function(res){
    // remove the quotes from words:
    var story = JSON.parse(res);
    console.log(story);
    // render the
    View.render(story);
  });
};
