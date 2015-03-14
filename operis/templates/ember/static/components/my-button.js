import Ember from 'ember';

var MyButtonComponent = Ember.Component.extend({
  actions: {
    showConfirmation: function() {
      this.toggleProperty('isShowingConfirmation'); 
    },

    confirm: function() {
      this.toggleProperty('isShowingConfirmation');
      this.sendAction('action', this.get('param'));
    }
  }
});

export default MyButtonComponent;