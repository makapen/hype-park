import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeHash: {
    users: function(userHash) {
      userHash.id = userHash.user_id;
      if (userHash.accountData) {
        userHash.account = userHash.accountData.account;
      }
      delete userHash.accountData;
      delete userHash.user_id;
      return userHash;
    }
  }
});
