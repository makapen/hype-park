import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['address'],

  actions: {
    submitAddress: function() {
      this.set('address', this.get('setAddress'))
      this.transitionToRoute('parking-map', {
        queryParams: {
          address: this.get('setAddress')
        }
      });
    }
  }
});
