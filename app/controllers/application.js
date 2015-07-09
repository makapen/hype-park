import Ember from 'ember';

export default Ember.Controller.extend({
  // checkPassword: function() {
  //   var password = this.get('password');
  //   console.log(password)
  //   if (password === 'turnips') {
  //     this.set('isIn', true);
  //   }
  // }.observes('password')
  actions: {
    submitPassword: function() {
      var password = this.get('password');
      console.log(password)
      if (password === 'turnips') {
        this.set('isIn', true);
      }
    }
  }
});
