import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('review-parking-details', {
        queryParams: {
          address: this.controllerFor('create-or-login.index').get('address'),
          addressLat: this.controllerFor('create-or-login.index').get('addressLat'),
          addressLng: this.controllerFor('create-or-login.index').get('addressLng'),
          selectedAddress: this.controllerFor('create-or-login.index').get('selectedAddress'),
          spot: this.controllerFor('create-or-login.index').get('spot')
        }
      });
    }
  }
});
