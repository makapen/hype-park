import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  afterModel: function() {
    return this.loadGoogleMap();
  },
  
  actions: {
    logout: function() {
      this.get('session').invalidate();
    },

    signUp: function() {
      this.transitionTo('create-or-login');
    },

    goBack: function() {
      if (this.controller) {
        this.controller.send('goBack');
        return;
      }
      this.replaceWith('index');
    }
  }
});
