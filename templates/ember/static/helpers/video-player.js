import Ember from "ember";

var videoPlayer = Ember.Handlebars.makeBoundHelper(function(value) {
    var link = "http://www.youtube.com/embed/" + value;
    return new Ember.Handlebars.SafeString('<iframe type="text/html" src="'+link+'" frameborder="0" allowfullscreen="true"></iframe>');
});

export default videoPlayer;