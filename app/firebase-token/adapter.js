import ApplicationAdapter from '../adapters/application';
import config from '../config/environment';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  findRecord: function(store, type, id) {
    var self = this;

    var options = {
      id_token: id, // The id_token you have now
      targetClientId: config['ember-cli-auth0-lock'].cid,
      api: 'firebase',
      scope: "openid profile"
    };

    return new Ember.RSVP.Promise(function(resolve, reject) {
      self.get('auth0')
      .getDelegationToken(options, function(err, delegationResult) {
        if (err) {
          return reject(new Error(err));
        }

        self.get('firebase').authWithCustomToken(delegationResult.id_token,
          function(error) {
            if (error) {
              return reject(new Error(err));
            }
            resolve({
              id: id,
              token: delegationResult.id_token,
              expiresIn: delegationResult.expires_in
            });
          });
      });
    });
  },
  recordWasPushed: function() {
    //no op
  },
});
