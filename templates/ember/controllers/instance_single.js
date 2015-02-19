import Ember from "ember";

import Operis{{ model.singular }}Controller from '{{ember_app_name}}/controllers/operis/operis-{{ model.singular_converted }}';

var {{ model.singular }}Controller = Operis{{ model.singular }}Controller.extend({
   
   actions: {
        
        delete: function( item ) {
            Ember.Logger.info('Item is:', item);
            item.on('didDelete', this, function () {
                this.transitionToRoute('{{ model.plural_converted }}.index', {queryParams: {page: 1}});
            });
            item.destroyRecord();
        }
        
   }
   
});

export default {{ model.singular }}Controller;