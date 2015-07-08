import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    Ember.Logger.log('adsfas', this.get('session.isAuthenticated'))
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('pay');
    }
  },

  deactivate: function() {
    this.send('hideLock');
  }
});
