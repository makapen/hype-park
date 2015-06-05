import Base from 'simple-auth/authenticators/base';
import config from '../config/environment';
import Ember from 'ember';

var auth0Config = config['ember-cli-auth0-lock'];

export default Base.extend({
  getFirebaseToken: function(auth0Token) {
    return this.store.find('firebase-token', auth0Token).then(function(firebaseToken) {
      return firebaseToken.serialize();
    });
  },
  getAuth0Token: function(setupCallback) {
    var self = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      var isComplete = false;
      var auth0Options = {
        signupLink: window.location.origin,
        responseType: 'token',
        gravatar: false,
        popup: true
      };

      var auth0LockInstance = self.get('auth0Lock').show(auth0Options,
        function(err, profile, token) {
          if (err) {
            //don't fail on password errors or missing info
            return;
          }
          isComplete = true;
          resolve({
            token: token,
            profile: profile
          });
        });


      auth0LockInstance.on('hidden', function() {
        if (!isComplete) {
          reject();
        }
      });
      setupCallback(auth0LockInstance);
    });
  },
  refreshToken: function(existingToken) {
    var auth0 = this.get('auth0');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      auth0.renewIdToken(existingToken, function(err, delegationResult) {
        if (err) {
          return reject(new Error(err));
        }
        auth0.getProfile(delegationResult.id_token, function(err, profile) {
          if (err) {
            return reject(new Error(err));
          }
          resolve({
            profile: profile,
            token: delegationResult.id_token,
            expiresIn: delegationResult.expires_in
          });
        });
      });
    });
  },
  authenticate: function(options) {
    var auth0Lock = new Auth0Lock(auth0Config.cid, auth0Config.domain, {
      cdn: auth0Config.cdnUrl
    });

    this.set('auth0Lock', auth0Lock);

    options = options || {};
    return this.getAuth0Token(options.setupCallback, options.existingToken)
      .then(function(auth0Session) {
        return this.getFirebaseToken(auth0Session.token)
          .then(function(firebaseSession) {
            return {
              firebaseToken: firebaseSession.token,
              auth0Token: auth0Session.token,
              auth0Profile: auth0Session.profile
            };
          });
      }.bind(this));
  },
  restore: function(data) {
    var self = this;

    if (this.get('restored') && data.auth0Token) {
      return Ember.RSVP.resolve(data);
    }

    return this.refreshToken(data.auth0Token)
      .then(function(auth0Session) {
        return this.getFirebaseToken(auth0Session.token)
          .then(function(firebaseSession) {
            self.get('restored', true);

            delete data.user;
            return {
              auth0Profile: auth0Session.profile,
              firebaseToken: firebaseSession.token,
              auth0Token: auth0Session.token
            };
          });
      }.bind(this));
  },
  invalidate: function(options) {
    var firebase = new Firebase(config.firebase);
    firebase.unauth();

    options = options || {};

    var auth0Config = config['ember-cli-auth0-lock'];

    var logoutPromise = new Ember.RSVP.Promise(function(resolve) {
      Ember.$.get('https://' + auth0Config.domain + '/logout', {
        href: window.location.origin
      }, resolve);
    });

    return logoutPromise;
  }
});
