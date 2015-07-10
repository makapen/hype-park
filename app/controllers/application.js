import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submitPassword: function() {
      var password = this.get('password');
      if (password === 'turnips') {
        this.set('isIn', true);
      }
    }
  }
});
