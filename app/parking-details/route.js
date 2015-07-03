import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    toDetails: function() {
      this.transitionTo('review-parking-details');
    }
  }
});
