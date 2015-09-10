import Ember from 'ember';

export default Ember.Controller.extend({
  currentFilter: 'Distance',
  filteredByDistance: true,

  zoom: 17,
  centerLat: null,
  centerLng: null,
  markers: Ember.A([
    {
      lat: 47.599018,
      lng: -122.335178,
      title: 'Galvanize'
    }
  ]),

  observesFilter: function() {
    var whichFilter = this.get('filteredByDistance') ? 'Distance' : 'Price';
    this.set('currentFilter', whichFilter);
  }.observes('filteredByDistance', 'filteredByPrice'),

  actions: {
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
