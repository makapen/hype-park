import Ember from 'ember';
import Auth0Authenticator from './auth0-simple-authenticator';

export default Auth0Authenticator.extend({
    getAuth0Token: function(setupCallback) {
      var self = this;

      return new Ember.RSVP.Promise(function(resolve, reject) {
        var isComplete = false;
        var profile;
        var auth0Lock = self.get('auth0Lock').showSignup(function(err, profile, token) {
          if (err) {
            //don't fail on duplicate account or other issues
            return;
          }
          isComplete = true;

          profile = profile;
          resolve({
            token: token,
            profile: profile
          });

        });

        auth0Lock.on('hidden', function() {
          if (!isComplete) {
            reject();
          }
        });

        setupCallback(auth0Lock);

      });
    }
  });
