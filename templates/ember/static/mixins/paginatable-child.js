import Ember from 'ember';

var PaginatableChild = Ember.Mixin.create({
  
    added: null,
    deleted: null,
    page: 1,
    lastPage: 1,
    rpp: 5,
    
    init: function() {
        var thevar = this.get('paginatable_var');
        this.addObserver(thevar, this, 'setPage');
        this._super();
    },
    
    addedWatchDog: function () {     
        Ember.Logger.info("ADDED");          
        var thecount = this.get('rpp') * this.get('page');
        if (this.get('model.length') <= thecount) {
            Ember.Logger.info("ADDED LOCAL");
            //this.get('current_results').addObject(this.get('added'));
        } else {
            Ember.Logger.info("ADDED ROUNDTRIP");
            //this.incrementProperty('page');
            var thevar = this.get('paginatable_var');
            this.incrementProperty(thevar);
            //this.store.find('ppfa-test', {page: this.get('page')});
        }
    }.observes('added'),
    
    deletedWatchDog: function () {
        Ember.Logger.info("DELETED"); 
        var thecount = this.get('model.length') % this.get('rpp');
        if (thecount > 0) {
            Ember.Logger.info("DELETED LOCAL");
            //this.get('current_results').removeObject(this.get('deleted')); 
        } else {
            Ember.Logger.info("DELETED ROUNDTRIP");
            //this.decrementProperty('page'); 
            var thevar = this.get('paginatable_var');
            this.decrementProperty(thevar);
            //this.store.find('ppfa-test', {page: this.get('page')});
        }
    }.observes('deleted'),
    
    setPage: function() {
        var thevar = this.get('paginatable_var');
        var value = this.get(thevar);
        this.set('page',value);
    },
    
    num_pages: function() {
        return Math.ceil(this.get("model.length") / this.get("rpp"));
    }.property('model.@each'),
    
    paginatedContent: function() {
        var startrec = (this.get('page') - 1) * this.get('rpp');
        var endrec = startrec + this.get('rpp');
        return this.get('this.arrangedContent').slice(startrec,endrec);
    }.property("model.@each", "sortProperties", "sortAscending", "page")
    
});

export default PaginatableChild;