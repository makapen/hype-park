import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    returnHome: function() {
      this.transitionToRoute('index');
    }
  }
});
