import Ember from "ember";

var JqueryUiDatetimePicker = Ember.TextField.extend({
      modelChangedValue: function(){
        
        this.$().datetimepicker('setDate', (this.get("value")) );
        
      }.observes("value"),
     
      didInsertElement: function(){
        var scope = this;
        Ember.run.schedule('afterRender', scope, scope.startDatePicker);
        
      },
      
      startDatePicker: function() {
        var scope = this;
        this.$().datetimepicker({
        	controlType: 'select',
        	timeFormat: 'hh:mm tt',
            onClose: function(dateText, inst) {
        	   var parentView = scope.get('parentView');
               parentView.set('value', scope.get('value'));	
               parentView.set('isEditing', false);	
        	}
        });
        //this.$().datetimepicker('setDate', (this.get("value")) );
        this.$().datepicker( "show" );
        
      },
     
      willDestroyElement: function(){
        //var picker = this.get("_picker");
        //if (picker) {
        //  picker.destroy();
        //}
        //this.set("_picker", null);
      }
});

export default JqueryUiDatetimePicker;