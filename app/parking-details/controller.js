import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['selectedAddress'],
  currentFilter: 'Distance',
  filteredByDistance: true,
  selectedAddress: null,

  zoom: 20,
  centerLat: null,
  centerLng: null,
  markers: Ember.A([
    {
      lat: 47.599489 ,
      lng: -122.330747,
      title: 'Parking',
      icon: 'images/parking_marker.png'
    }
  ]),

  actions: {


  }

})
