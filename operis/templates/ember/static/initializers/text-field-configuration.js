import Ember from 'ember';

export default {
  name: 'text-field-configuration',
  initialize: function() {
    Ember.TextField.reopen({
        attributeBindings: ['style', 
                            'accept', 
                            'autocomplete', 
                            'autofocus', 
                            'name', 
                            'required']
    });
  }
};