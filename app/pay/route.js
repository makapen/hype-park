import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    purchaseSpot: function() {
      this.transitionTo('parking-spots');
    }
  }
});
