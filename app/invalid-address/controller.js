import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['zipCode'],

  actions: {
    returnHome: function() {
      this.transitionToRoute('index');
    }
  }
});
