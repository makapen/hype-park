import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submitPassword: function() {
      var password = this.get('password');
      if (password === 'HypePark!206') {
        this.set('isIn', true);
      }
    }
  }
});
