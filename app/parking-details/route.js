import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Route.extend({
  model(params, transition) {
    return JSON.parse(transition.queryParams.spot);
  },

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
