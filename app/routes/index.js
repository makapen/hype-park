/* global jwt_decode */
import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    submitAddress: function() {
      this.transitionTo('parking-map');
      this.set('session.address', this.controllerFor('index').get('address'));
    }
  }
});
