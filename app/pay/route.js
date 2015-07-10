import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    var accountId = this.get('session.content.secure.auth0Profile.accountData.account');

    return this.store.findById('account', accountId).then( (account) => {
      this.set('session.account', account);

      return account;
    });
  },

  actions: {
    purchaseSpot: function() {
      this.modelFor('pay').save().then ( () => {
        this.transitionTo('parking-spots');
      });
    }
  }
});
