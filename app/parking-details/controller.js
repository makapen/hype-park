import Ember from 'ember';

export default Ember.Controller.extend({
  currentFilter: 'Distance',
  filteredByDistance: true,

  zoom: 20,
  centerLat: 47.599489,
  centerLng: -122.330747,
  markers: Ember.A([
    {
      lat: 47.599489 ,
      lng: -122.330747,
      title: 'Parking',
      icon: 'images/parking_marker.png'
    }
  ])

});
