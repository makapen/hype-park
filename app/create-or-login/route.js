import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    payParking: function() {
      this.transitionTo('review-parking-details');
    }
  }
});
