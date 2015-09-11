import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['address', 'addressLat', 'addressLng'],

  // google map options
  zoom: 12,
  markers: Ember.computed.alias('model'),

  currentFilter: 'Distance',
  filteredByDistance: true,

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
