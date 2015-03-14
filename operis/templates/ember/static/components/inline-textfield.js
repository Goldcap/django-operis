//http://blakewilliams.me/blog/double-click-to-edit-in-ember
import Ember from "ember";

var InlineTextfield = Ember.View.extend({
  
  tagName: "span",
  classNames: ['inline-editor'],
  style: "width: 100%",
  attributeBindings: ['style'],
  
  transition: function() {
    if ((!this.get('isEditing')) && (this.get("model.editing") === this.get('item')))  {
      this.set('isEditing', true);
      Ember.run.scheduleOnce('afterRender', this, this.focusTextField);
    } else {
      this.set('isEditing', false);
    }
  }.observes('model.editing'),
    
  doubleClick: function() {
    if (!this.get('isEditing'))  {
      this.set('isEditing', true);
      Ember.run.scheduleOnce('afterRender', this, this.focusTextField);
    }
  },

  focusTextField: function() {
    var val = this.$('input').val();
    this.$('input').focus();

    this.$('input').val('');
    this.$('input').val(val);
  },
          
  textField: Ember.TextField.extend({
     
    keyPress: function(key) {
        if(key.keyCode === 13) {
            var parentView = this.get('parentView'); 
            parentView.set('isEditing', false);
        }
    },
  
    focusOut: function() {
      this.save();
    },
    
    save: function() {
      var parentView = this.get('parentView'); 
      parentView.set('isEditing', false);
    }
                    
  })
});


export default InlineTextfield;