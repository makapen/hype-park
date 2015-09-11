import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['address'],
  // computedAddress: Ember.observer('setAddress', function() {
  //   this.set('address', this.get('setAddress'))
  // }),
  actions: {
    submitAddress: function() {
      this.transitionTo('parking-map', {
        queryParams: {
          address: this.get('address')
        }
      });
    }
  }
});
