import Ember from 'ember';

var PaginatableArray = Ember.Mixin.create ({
  
    added: null,
    deleted: null,
    page: 1,
    current_results: [],
    num_pages: 1,
    lastPage: 1,
    rpp: 5,
    
    addedWatchDog: function () {     
        Ember.Logger.info("ADDED PA");
        if (this.get('current_results').length < this.get('rpp')) {
            //Ember.Logger.info("ADDED LOCAL");
            this.get('current_results').addObject(this.get('added'));
        } else {
            //Ember.Logger.info("ADDED ROUNDTRIP");
            this.incrementProperty('page');
            this.store.find('ppfa-test', {page: this.get('page')});
        }
    }.observes('added'),
    
    deletedWatchDog: function () {
        Ember.Logger.info("DELETED PA");
        if (this.get('current_results').length > 1) {
            //Ember.Logger.info("DELETED LOCAL");
            this.get('current_results').removeObject(this.get('deleted')); 
        } else {
            //Ember.Logger.info("DELETED ROUNDTRIP");
            this.decrementProperty('page');
            this.store.find('ppfa-test', {page: this.get('page')});
        }
    }.observes('deleted'),
    
    paginatedContent: function () {
        //Ember.Logger.info("Paginated Content");
        //var appController = this.container.lookup('controller:application');
        //Ember.Logger.info(appController.get('currentPath'));
                
        this.set('current_results',[]);
        
        if (this.get('content.isLoaded')) {
            var scope = this;
            
            var metadata = this.get('store').typeMapFor(this.get('model.type')).metadata;
            //this.set('page',metadata.current_page);
            
            this.set('num_pages',metadata.num_pages);
            this.set('rpp',metadata.rpp); 
            
            //We'll safely (?) assume that the paged result is there
            //Since the content is "loaded"
            this.get('store.paged_result').forEach(function(item) {
                Ember.Logger.info(item);
                //Since we're using promises, we might not have our objects yet
                //Let's be careful to make sure we return __something__
                var ds_item = scope.findBy('id',item.id.toString());
                if (ds_item) {
                    scope.get('current_results').addObject(ds_item);    
                } else {                 
                    Ember.Logger.error("Adding Raw JSON to Array");
                    //Ember.run.scheduleOnce('afterRender', scope, scope.rePopulate, item.id.toString() );
                    scope.get('current_results').addObject(item);
                }
            });
            
            return this.get('current_results');
        }
    }.property('content.isLoaded','current_results')
    
});

export default PaginatableArray;