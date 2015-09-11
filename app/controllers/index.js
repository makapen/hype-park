import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['address'],

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
