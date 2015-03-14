import Ember from "ember";
import JqueryUiWidget from 'ember-app/mixins/jquery-ui-widget';

// Create a new Ember view for the jQuery UI Progress Bar widget
var JqueryUiProgressBarView = Ember.View.extend(JqueryUiWidget, {
  uiType: 'progressbar',
  uiOptions: ['value', 'max'],
  uiEvents: ['change', 'complete']
});// JavaScript Document


export default JqueryUiProgressBarView;
