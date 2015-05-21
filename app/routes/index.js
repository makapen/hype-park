/* global jwt_decode */
import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  beforeModel: function(transition) {
    if (this.get('session.isAuthenticated')) {
      transition.abort();
      this.get('session').set('afterLogoutRedirect', window.location.href);
      this.get('session').invalidate();
      return;
    }
  },

  onAuthenticationPromise: function() {
    if (this.get('authenticationPromise')) {
      this.get('authenticationPromise').then(function() {
          this.set('authenticationPromise', null);
          this.transitionTo('index');
        }.bind(this))
        .catch(function(err) {
          Ember.Logger.log('error authenticate', err)
          if (!this.get('session.isAuthenticated')) {
            this.get('session').set('auth0Active', false);
            this.transitionTo('login');
          }
        }.bind(this));
    }
  }.observes('authenticationPromise'),

  actions: {
    hideLock: function() {
      var lock = this.get('lock');
      if (lock) {
        lock.hide();
      }
    },
    logIn: function() {
      var self = this;

      if (this.session.get('isAuthenticated')) {
        self.send('activate');
        return;
      }

      var logInPromise = this.get('session')
        .authenticate('authenticator:auth0', {
          setupCallback: function(auth0Lock) {
            this.set('lock', auth0Lock);
          }.bind(this)
        });

      this.get('session').set('auth0Active', true);
      this.transitionTo('index');
      this.set('authenticationPromise', logInPromise);
    },
    signUp: function() {
      var self = this;

      if (this.session.get('isAuthenticated')) {
        self.send('activate');
        return;
      }

      var signUpPromise = this.get('session')
        .authenticate('authenticator:auth0-signup', {
          setupCallback: function(auth0Lock) {
            Ember.Logger.log('callback auth0lock', auth0Lock);
            this.set('lock', auth0Lock);
          }.bind(this)
        });

      this.get('session').set('auth0Active', true);

      this.set('authenticationPromise', signUpPromise);
    },

    sessionAuthenticationSucceeded: function() {
      return false;
    }
  }
});
