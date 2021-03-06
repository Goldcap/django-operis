import Ember from 'ember';
{% if model.has_parent -%}
import PaginatableChild from '{{ember_app_name}}/mixins/paginatable-child';
{%- else %}
import PaginatableArray from '{{ember_app_name}}/mixins/paginatable-array';
{% endif %}

{% if model.has_parent -%}                                                                   
//var Operis{{ model.plural }}Controller = Ember.ArrayController.extend( PaginatableChild, {});
var Operis{{ model.plural }}Controller = Ember.ArrayController.extend({});
{%- else %}
var Operis{{ model.plural }}Controller = Ember.ArrayController.extend( PaginatableArray, {});
{%- endif %}

export default  Operis{{ model.plural }}Controller;  