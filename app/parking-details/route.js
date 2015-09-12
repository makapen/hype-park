import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Route.extend({
  model(params, transition) {
    return JSON.parse(transition.queryParams.spot);
  },

  afterModel: function() {
    return this.loadGoogleMap();
  },


  actions: {
    createOrLogin: function() {
      this.transitionTo('create-or-login', {
        queryParams: {
          address: this.controllerFor('parking-details').get('address'),
          addressLat: this.controllerFor('parking-details').get('addressLat'),
          addressLng: this.controllerFor('parking-details').get('addressLng'),
          selectedAddress: this.controllerFor('parking-details').get('selectedAddress'),
          spot: this.controllerFor('parking-details').get('spot')
        }
      });
    },
    dateChanged: function(date) {
      // this.modelFor('parking-details').set('startDate', date);
    }
  }
});
