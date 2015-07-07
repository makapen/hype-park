import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    spotSelected: function() {
      this.transitionTo('parking-details');
    }
  }
});
