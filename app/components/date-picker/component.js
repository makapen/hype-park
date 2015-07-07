import Ember from 'ember';

export default Ember.Component.extend({
  _init: function() {
    this.$('.date-picker').datetimepicker().on('dp.change', (dateObj) => {
      console.log(dateObj)
      this.sendAction('dateChanged', dateObj.date._d);
    });
  }.on('didInsertElement'),

  _destroy: function() {

  }.on('willRemoveElement')
});
