import DS from 'ember-data';

export default DS.Model.extend({
  addres: DS.attr('string'),
  startDate: DS.attr('date'),
  account: DS.belongsTo('account', { async: true})
});
