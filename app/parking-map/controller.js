import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['address', 'addressLat', 'addressLng', 'selectedAddress'],

  // google map options
  zoom: 12,
  markers: Ember.computed.alias('model'),

  distance1: Ember.computed('addressLat', 'addressLng', function() {
    return this.getDistanceFromLatLonInKm(this.get('addressLat'), this.get('addressLng'), 47.599489, -122.330747);
  }),

  distance2: Ember.computed('addressLat', 'addressLng', function() {
    return this.getDistanceFromLatLonInKm(this.get('addressLat'), this.get('addressLng'), 47.601989 , -122.331727);
  }),

  distance3: Ember.computed('addressLat', 'addressLng', function() {
    return this.getDistanceFromLatLonInKm(this.get('addressLat'), this.get('addressLng'), 47.600869, -122.333614);
  }),

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

  currentFilter: 'Distance',
  filteredByDistance: true,

  observesFilter: function() {
    var whichFilter = this.get('filteredByDistance') ? 'Distance' : 'Price';
    this.set('currentFilter', whichFilter);
  }.observes('filteredByDistance', 'filteredByPrice'),

  actions: {
    spotSelected: function(selectedAddress) {
      this.transitionTo('parking-details', {
        queryParams: {
          selectedAddress: selectedAddress
        }
      });
    },
    filterByDistance: function() {
      this.set('filteredByDistance', true);
      this.set('filteredByPrice', false);
    },
    filterByPrice: function() {
      this.set('filteredByPrice', true);
      this.set('filteredByDistance', false);
    }
  }
});
