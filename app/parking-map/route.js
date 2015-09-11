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
      this.set('lat', result.geometry.location.lat);
      this.set('lng', result.geometry.location.lng);

      // var one = ajax({
      //   method: 'post',
      //   url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + this.get('lat') + ',' + this.get('lng') + '&destinations=47.599489,-122.330747&units=imperial'
      // })
      //
      // var two = ajax({
      //   method: 'post',
      //   url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + this.get('lat') + ',' + this.get('lng') + '&destinations=47.601989,-122.331727&units=imperial'
      // })
      //
      // var three = ajax({
      //   method: 'post',
      //   url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + this.get('lat') + ',' + this.get('lng') + '&destinations=47.600869,-122.333614&units=imperial'
      // })
      //
      // return Ember.RSVP.all([one, two, three]).then( (bigPromise) => {
      //   Ember.Logger.log('asdf', bigPromise)
      // })
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
        lat: this.get('lat'),
        lng: this.get('lng'),
        title: 'Parking'
      }
    ])
  },

  afterModel: function() {
    return this.loadGoogleMap();
  },

  setupController(controller, model) {
    this.controllerFor('parking-map').set('addressLat', this.get('lat'));
    this.controllerFor('parking-map').set('addressLng', this.get('lng'));

    this._super(controller, model);
  },

  actions: {
    spotSelected: function(selectedAddress) {
      controller.set('selectedAddress', selectedAddress);
    }

  }
});
