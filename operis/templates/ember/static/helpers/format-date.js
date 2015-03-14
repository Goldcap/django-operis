import Ember from "ember";

var formatDate = Ember.Handlebars.makeBoundHelper(function(date,format) {
  return window.moment(date).format(format);
});

export default formatDate;