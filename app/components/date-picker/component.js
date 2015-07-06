import Ember from 'ember';

export default Ember.Component.extend({
  _init: function() {
    this.$('.date-picker').datetimepicker().on('dp.change', (date) => {
      this.sendAction('dateChanged', date);
    });
  }.on('didInsertElement'),

  _destroy: function() {

  }.on('willRemoveElement')
});
