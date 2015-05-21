import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend({
  beforeModel: function(transition) {
    if (this.get('session.isAuthenticated')) {
      this.get('session').invalidate().then(function() {
        this.transitionTo('index');
      }.bind(this));
    } else {
      transition.send('goBack');
    }
  }
});
