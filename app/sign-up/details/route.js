import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('sign-up');
    }
  },

  model: function() {
    return this.store.createRecord('account');
  },

  actions: {
    submitDetails: function() {
      this.modelFor('sign-up.details').save();
    }
  }
});
