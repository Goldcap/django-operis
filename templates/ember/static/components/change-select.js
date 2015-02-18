import Ember from "ember";

var ChangeSelectView = Ember.Select.extend({
  change: function (args) {
    var self = this;
    this._super(args);
    var callback = this.get('onChange');
    if (callback) {
        Ember.run.later(function () {
            self.get('controller').send(callback,self);
        });
    }
  }
});

export default ChangeSelectView;