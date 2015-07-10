/* global jwt_decode */
import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  onAuthenticationPromise: function() {
    if (this.get('authenticationPromise')) {
      this.get('authenticationPromise')
      .then(function() {
        if (this.get('session.attemptedTransition')) {
          this.get('session.attemptedTransition').retry();
        } else {
          this.transitionTo('pay');
        }
      }.bind(this))
      .catch(function() {
        if (!this.get('session.isAuthenticated')) {
          this.get('session').set('auth0Active', false);
          this.transitionTo('index');
        }
      }.bind(this));
    }
  }.observes('authenticationPromise'),

  actions: {
    payParking: function() {
      this.transitionTo('review-parking-details');
    },

    error: function(e) {
      var errorMessage;

      if (e.responseJSON && e.responseJSON.error) {
        errorMessage =  e.responseJSON.error.message;
      } else {
        errorMessage =  e.responseJSON && e.responseJSON.message;
      }

      this.replaceWith('sign-up.error', {queryParams: {errorMessage: errorMessage}});

    },
    hideLock: function() {
      var lock = this.get('lock');
      if (lock) {
        lock.hide();
      }
    },
    logIn: function() {
      var loginPromise = this.get('session')
        .authenticate('authenticator:auth0', {
          setupCallback: (auth0Lock) => {

            this.set('lock', auth0Lock);
          }
        });
        this.set('authenticationPromise', loginPromise);
    },
    signUp: function() {
      var account = this.store.createRecord('account');

      var signUpPromise = this.get('session')
        .authenticate('authenticator:auth0-signup', {
          setupCallback: (auth0Lock) => {
            this.set('lock', auth0Lock);
          },
          signUp: true,
          account: account
        });
      this.set('authenticationPromise', signUpPromise);
    },
    activate: function() {
      var inviteTokenVerificationPromise;

      var self = this,
      userFetch;
      if (!this.session.get('isAuthenticated')) {
        console.log('tried to signup without credentials');
        return;
      }

      var token = this.controller.get('model.token');

      //mark invite as accepted
      var inviteAcceptTask = this.modelFor('sign-up');
      inviteAcceptTask.set('inviteAccepted', true);
      inviteTokenVerificationPromise = inviteAcceptTask.save();

      inviteTokenVerificationPromise.then(function() {
        if (token) {
          self.transitionTo('sign-up.details');
          return;
        }

        if (!this.get('session.user')) {
          userFetch = this.store.find('user', 'current/' + this.get('session.auth0Token'));
        } else {
          userFetch = Ember.RSVP.resolve(self.get('session.user'));
        }

        var accountFetch = userFetch.then(function(user) {
          self.set('session.user', user);
          return user.get('account');
        });

        return accountFetch.then(function(account) {
          if (account) {
            self.replaceWith('sign-up.details');
          } else {
            return Ember.RSVP.reject();
          }
        });

      }.bind(this))
      .catch(function(e) {
        var errorMessage = e.responseJSON && e.responseJSON.error && e.responseJSON.error.message;

        self.replaceWith('sign-up.error', {queryParams: {errorMessage: errorMessage}});
        Ember.Logger.error(e);
      });
    },
    sessionAuthenticationSucceeded: function() {
      return false;
    }
  }
});
