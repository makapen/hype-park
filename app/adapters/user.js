import Ember from 'ember';
import UtilityServerAdapter from './utility-server-adapter';

export default UtilityServerAdapter.extend({
  findRecord: function(store, type, id) {
    var auth0 = this.get('auth0'),
    useAuth0 = id.split('/')[0] === 'current';

    if (useAuth0) {
      var auth0Token = id.split('/')[1];
      return new Ember.RSVP.Promise(function(resolve, reject) {
        auth0.getProfile(auth0Token,
         function (err, profile) {
          if (err) {
            return reject(new Error(err));
          }
          resolve({users:profile});
        });
      }.bind(this));
    } else {
      return this._super(store, type, id);
    }
  }
});
