import Ember from 'ember';
import EmberValidations from 'ember-validations';
import SubmittableItem from '{{ember_app_name}}/mixins/submittable-item';

var Operis{{ model.singular }}Controller = Ember.ObjectController.extend(EmberValidations.Mixin,SubmittableItem,{});

export default Operis{{ model.singular }}Controller;