import Ember from 'ember';

export default Ember.Route.extend({

  afterModel: function() {
    return this.loadGoogleMap();
  },
  
  actions: {
    createOrLogin: function() {
      this.transitionTo('create-or-login');
    },
    dateChanged: function(date) {
      // this.modelFor('parking-details').set('startDate', date);
    }
  }
});
