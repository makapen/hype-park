import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({

  beforeModel() {
    let address = this.get('session.address');
    console.log('the address is', address);
    let formatAddress = address.replace(/\s/g, '+');
    ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+formatAddress,
      method: 'get'
    }).then( (res) => {
      console.log('res', res);
      var result = res.results[0];
      this.set('result', result);
    })
  },

  afterModel: function() {
    return this.loadGoogleMap();
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('result', this.get('result'));
    controller.set('centerLat', this.get('result.geometry.location.lat'));
    controller.set('centerLong', this.get('result.geometry.location.long'));
    console.log ('center lat is....', controller.get('centerLat'))
  },

  actions: {
    spotSelected: function() {
      this.transitionTo('parking-details');
    }
  }
});
