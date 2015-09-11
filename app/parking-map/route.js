import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({

  beforeModel(transition) {
    Ember.Logger.log('transition', transition)

    let address, formatAddress;

    try {
      address = transition.queryParams.address;
      formatAddress = address.replace(/\s/g, '+');
    }

    catch(e) {
      throw new Error(e);
    }

    return ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+formatAddress,
      method: 'get'
    }).then( (res) => {
      var result = res.results[0];
      this.set('result', result);
    })
  },

  model() {
    return Ember.A([
      {
        lat: 47.599489 ,
        lng: -122.330747,
        title: 'Parking',
        icon: 'images/parking_marker.png'
      },

      {
        lat: 47.601989 ,
        lng: -122.331727,
        title: 'Parking',
        icon: 'images/parking_marker.png'
      },

      {
        lat: 47.600869  ,
        lng: -122.333614,
        title: 'Parking',
        icon: 'images/parking_marker.png'
      },

      {
        lat: this.get('result.geometry.location.lat'),
        lng: this.get('result.geometry.location.lng'),
        title: 'Parking'
      }
    ])
  },

  afterModel: function() {
    return this.loadGoogleMap();
  },

  setupController(controller, model) {
    this._super(controller, model);

    this.controllerFor('parking-map').set('addressLat', this.get('result.geometry.location.lat'));
    this.controllerFor('parking-map').set('addressLng', this.get('result.geometry.location.lng'));
  },

  actions: {
    spotSelected: function(selectedAddress) {
      controller.set('selectedAddress', selectedAddress);
    }

  }
});
