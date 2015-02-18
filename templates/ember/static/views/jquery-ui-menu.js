import Ember from "ember";
import JqueryUiWidget from 'ember-app/mixins/jquery-ui-widget';

var JqueryUiMenuView = Ember.CollectionView.extend(JqueryUiWidget, {
  uiType: 'menu',
  uiOptions: ['disabled'],
  uiEvents: ['select'],

  tagName: 'ul',

  // Whenever the underlying Array for this `CollectionView` changes,
  // refresh the jQuery UI widget.
  arrayDidChange: function(content, start, removed, added) {
    this._super(content, start, removed, added);

    var ui = this.get('ui');
    if (ui) {
      // Schedule the refresh for after Ember has completed it's
      // render cycle
      Ember.run.scheduleOnce('afterRender', ui, ui.refresh);
    }
  },
  itemViewClass: Ember.View.extend({
    // Make it so that the default context for evaluating handlebars
    // bindings is the content of this child view.
    context: function(){
      return this.get('content');
    }.property('content')
  })
});

export default JqueryUiMenuView;