import Ember from "ember";

var InlineTextfieldController = Ember.Component.extend({
  tagName: "a",
  
  click: function() {
    if (this.get('model.editing') === 'None')  {
      this.set('model.editing', this.get("item"));
    } else {
      this.set('model.editing', 'None');
    }
  },
  
  doubleClick: function() {
    if (this.get('model.editing') === 'None')  {
      this.set('model.editing', this.get("item"));
    } else {
      this.set('model.editing', 'None');
    }
  }
  
});


export default InlineTextfieldController;