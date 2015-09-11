import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['selectedAddress', 'addressLat', 'addressLng'],
  currentFilter: 'Distance',
  filteredByDistance: true,
  selectedAddress: null,

  zoom: 20,
  markers: Ember.computed.alias('model'),

  actions: {


  }

})
