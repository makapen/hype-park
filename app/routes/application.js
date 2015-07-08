import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    logout: function() {

    },

    signUp: function() {

    },
    
    goBack: function() {
      if (this.controller) {
        this.controller.send('goBack');
        return;
      }
      this.replaceWith('index');
    }
  }
});
