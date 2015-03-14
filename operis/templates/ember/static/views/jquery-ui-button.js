import Ember from "ember";
import JqueryUiWidget from 'ember-app/mixins/jquery-ui-widget';

// Create a new Ember view for the jQuery UI Button widget
var JqueryUiButton = Ember.View.extend(JqueryUiWidget, {
  uiType: 'button',
  uiOptions: ['label', 'disabled'],

  tagName: 'button'
});

export default JqueryUiButton;