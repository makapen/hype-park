import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['address', 'addressLat', 'addressLng', 'selectedAddress', 'spot'],

  // google map options
  zoom: 12,
  markers: Ember.computed.alias('model'),

  currentFilter: 'Distance',
  filteredByDistance: true,

  sortedModel: Ember.computed('model', 'filteredByDistance', 'filteredByPrice', function() {
    var whichFilter = this.get('filteredByDistance') ? 'Distance' : 'Price';
    this.set('currentFilter', whichFilter);

    if (whichFilter === 'Distance') {
      return this.get('model').sort(function(a, b) {
        return a.distance > b.distance;
      })
    }
    else {
      return this.get('model').sort(function(a, b) {
        return a.price > b.price;
      })
    }
  }),

  convertIndex: Ember.computed(function(index) {
    return index + 1;
  }),

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
