import Ember from "ember";

var booleanSuccess = Ember.Handlebars.makeBoundHelper(function(status) {
    var value = (status) ? '<span class="success label">Success</span>' : '<span class="alert label">Failure</span>';
    return new Ember.Handlebars.SafeString(value);
});

export default booleanSuccess;