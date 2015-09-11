import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel(transition) {
    let selectedAddress = transition.queryParams.selectedAddress;
    let formatSelectedAddress = selectedAddress.replace(/\s/g, '+');
    ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+formatSelectedAddress,
      method: 'get'
    }).then( (res) => {
      console.log('res', res);
      var result = res.results[0];
      this.set('selected address result', result);
    })
  },

  afterModel: function() {
    return this.loadGoogleMap();
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('result', this.get('result'));
    controller.set('centerLat', this.get('result.geometry.location.lat'));
    controller.set('centerLng', this.get('result.geometry.location.lng'));
  },

  actions: {
    createOrLogin: function() {
      this.transitionTo('create-or-login');
    },
    dateChanged: function(date) {
      // this.modelFor('parking-details').set('startDate', date);
    }
  }
});
