import Ember from 'ember';

var MasonryGrid = Ember.Mixin.create ({
  
    masonry: null,
    
    init: function() {
        this._super();
        //this.scheduleMasonry();
    },
    
    scheduleMasonry: function() { 
      var scope = this;
      //if (this.get("masonry")) {
      //  Ember.run.schedule('afterRender', scope, scope.applyMasonryLayout);  
      //} else {
        Ember.run.schedule('afterRender', scope, scope.applyMasonry);
      //}
    },
    
    applyMasonry: function() {
    
        //Ember.Logger.info("Apply Masonry in Mixin");
        //Ember.Logger.info("Scope is %s",this.get('masonry_item'));
        var scope = this;   
        var container = document.querySelector(scope.get('masonry_container'));
        var masonry = new Masonry(
            container,
            {
            containerStyle: null,
            itemSelector: scope.get('masonry_item'),
            //isFitWidth: true,
            //isAnimated: true
            }
        );
        this.set('masonry',masonry);
    },
    
    didScroll: function() {
        //if @isScrolledToBottom() {
            //@get('controller').send('more');
        //}
    },
    
    isScrolledToBottom: function() {
      var distanceToTop = Ember.$(document).height() - Ember.$(window).height();
      var thetop = Ember.$(document).scrollTop();
      return thetop === distanceToTop;
    },
    
    applyMasonryLayout: function() {
        //Ember.Logger.info("Apply Masonry Layout");
        var masonry = this.get('masonry');
        masonry.layout();
    }
    
});

export default MasonryGrid;