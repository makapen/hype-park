import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['address', 'centerLat', 'centerLng', 'selectedAddress'],
  currentFilter: 'Distance',
  filteredByDistance: true,

  zoom: 18,
  centerLat: null,
  centerLng: null,
  markers: Ember.A([
    {
      lat: 47.599489 ,
      lng: -122.330747,
      title: 'Parking',
      body: '111 S Jackson more text',
      icon: 'images/parking_marker.png'
    },

    {
      lat: 47.601989 ,
      lng: -122.331727,
      title: 'Parking',
      body: '111 S Jackson more text',
      icon: 'images/parking_marker.png'
    },

    {
      lat: 47.600869  ,
      lng: -122.333614,
      title: 'Parking',
      body: '111 S Jackson more text',
      icon: 'images/parking_marker.png'
    }
  ]),

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
