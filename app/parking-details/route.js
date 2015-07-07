import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createOrLogin: function() {
      this.transitionTo('create-or-login');
    },
    dateChanged: function(date) {
      // this.modelFor('parking-details').set('startDate', date);
    }
  }
});
