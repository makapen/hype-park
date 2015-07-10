import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var accountId = this.get('session.content.secure.auth0Profile.accountData.account');

    return this.store.findById('account', accountId).then( (account) => {
      this.set('session.account', account);
      return account;
    });
  },

  actions: {
    updateProfile: function() {
      this.modelFor('profile').save()
      .then( () => {
        this.notify.success('Profile Saved!');
      })
    }
  }
});
