import Ember from 'ember';
import ajax from 'ic-ajax';

var demoMarker = Ember.Object.extend({

});

export default Ember.Route.extend({
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 3959; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d.toFixed(1);
  },

  deg2rad(deg) {
    return deg * (Math.PI/180)
  },

  beforeModel(transition) {
    let address, formatAddress;

    try {
      address = transition.queryParams.address;
      formatAddress = encodeURIComponent(address);
    }

    catch(e) {
      throw new Error(e);
    }

    return ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+formatAddress,
      method: 'get'
    }).then( (res) => {
      var result = res.results[0];
      this.set('address', address);
      this.set('lat', result.geometry.location.lat);
      this.set('lng', result.geometry.location.lng);
    })
  },

  model() {
    return Ember.A([
      Ember.Object.create({
        lat: 47.599006,
        lng: -122.333879,
        isClickable: true,
        markerHasInfoWindow: false,
        icon: 'images/parking_marker_green.png',
        price: 130,
        address: '111 South Jackson Street',
        description: 'Park right next to Galvanize!',
        distance: this.getDistanceFromLatLonInKm(this.get('lat'), this.get('lng'), 47.599489, -122.330747)
      }),
      Ember.Object.create({
        lat: 47.597708 ,
        lng: -122.332029,
        isClickable: true,
        markerController: 'ParkingSpotController',
        markerHasInfoWindow: false,
        icon: 'images/parking_marker_green.png',
        price: 145,
        address: 'Century Link Field',
        description: 'Front row parking for games',
        distance: this.getDistanceFromLatLonInKm(this.get('lat'), this.get('lng'), 47.601989 , -122.331727)
      }),

      Ember.Object.create({
        lat: 47.601572,
        lng: -122.331251,
        isClickable: true,
        markerHasInfoWindow: false,
        markerController: 'ParkingSpotController',
        icon: 'images/parking_marker_green.png',
        price: 160,
        address: 'Seattle Downtown Services',
        description: 'Close walk to Il Corvo',
        distance: this.getDistanceFromLatLonInKm(this.get('lat'), this.get('lng'), 47.600869, -122.333614)
      }),

      Ember.Object.create({
        lat: this.get('lat'),
        lng: this.get('lng'),
        title: 'Parking',
        isSelected: true
      })
    ])
  },

  afterModel: function() {
    return this.loadGoogleMap();
  },

  setupController(controller, model) {
    this.controllerFor('parking-map').set('addressLat', this.get('lat'));
    this.controllerFor('parking-map').set('addressLng', this.get('lng'));
    this.controllerFor('parking-map').set('address', this.get('address'));
    this._super(controller, model);
  },

  actions: {
    spotSelected: function(spot) {
      this.transitionTo('parking-details', {
        queryParams: {
          address: this.get('address'),
          addressLat: this.get('addressLat'),
          addressLng: this.get('addressLng'),
          spot: JSON.stringify(spot)
        }
      });
    }

  }
});
