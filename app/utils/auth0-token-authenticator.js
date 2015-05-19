import Ember from 'ember';
import Auth0Authenticator from './auth0-simple-authenticator';

export default Auth0Authenticator.extend({
  getAuth0Token: function() {

    return new Ember.RSVP.Promise(function(resolve, reject) {
      var hash = this.get('auth0Lock').parseHash();
      if (hash.access_token) {
        resolve({
          token: hash.access_token
        });
      } else {
        reject(hash);
      }
    }.bind(this));
  }
});
