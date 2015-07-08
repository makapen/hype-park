import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    Ember.Logger.log('asdf', this.get('session'))
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('pay');
    }
  }
});
