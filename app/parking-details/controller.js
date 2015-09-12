import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['address', 'selectedAddress', 'spot'],

  currentFilter: 'Distance',
  filteredByDistance: true,
  selectedAddress: null,

  zoom: 16,
  markers: Ember.computed('model', function() {
    return Ember.A([this.get('model')]);
  }),

  actions: {


  }

})
