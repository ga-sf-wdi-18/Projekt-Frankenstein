// CLIENT

// on page load
$(function(){
  // get and render all the story
  Story.all();
  // set the view's behaviors
  View.init();
});

// VIEW OBJECT
function View() {};
View.init = function() {
  // story content submit event listener
  $("#story-content").on("change", function(e){
    // stop page reload
    e.preventDefault();
    // format content data into a query string
    var storyParams = $(this).serialize();
    // send a post request to put this story in db
    Story.update(storyParams);
  });
};

View.render = function(items, parentId, templateId) {
  // render a template
  var template = _.template($("#" + templateId).html());
  // input data into template and append to parent
  $("#" + parentId).html(template({collection: item}));
};

function Story() {};
Story.all = function() {
  $.get("/story", function(res){
    // parse the response
    var story = JSON.parse(res);
    // render the results
    View.render(story, "story-content", "story-template");
  });
};
