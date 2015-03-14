import Ember from "ember";
import JqueryUiDatetimePicker from "ember-app/components/jquery-ui-datetime-picker";

var InlineUiDatetimePicker = Ember.View.extend({
  
  formattedValue: function() {
    return window.moment(this.get('value')).format('M/D/YYYY HH:mm');  
  }.property('value'),
  
  
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
  
  picker: JqueryUiDatetimePicker.extend({})
  
});

export default InlineUiDatetimePicker;