import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({

  beforeModel(transition) {
    Ember.Logger.log('transition', transition)
    let address = transition.queryParams.address;
    let formatAddress = address.replace(/\s/g, '+');

    return ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+formatAddress,
      method: 'get'
    }).then( (res) => {
      var result = res.results[0];
      this.set('result', result);
    })
  },

  afterModel: function() {
    return this.loadGoogleMap();
  },

  setupController(controller, model) {
    controller.set('centerLat', this.get('result.geometry.location.lat'));
    controller.set('centerLng', this.get('result.geometry.location.lng'));
    this._super(controller, model);
  },

  actions: {
    spotSelected: function() {
      this.transitionTo('parking-details');
    }
  }
});
