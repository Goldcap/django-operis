import Ember from 'ember';

var PaginationPage = Ember.Component.extend({
    
    tagName: 'li',
    classNameBindings: 'isCurrent',
    
    isCurrent: function() {
        if (parseInt(this.get('page')) === parseInt(this.get('page_number'))) {
            return "current";
        }
        return "";
    }.property('page', 'page_number'),
    
    actions: {
        
        click: function(page_number) {
            var params = {};
            params[this.get('qs')] = page_number;
            this.get('item').transitionToRoute({queryParams: params});
            
        }
    }  
});

export default PaginationPage;