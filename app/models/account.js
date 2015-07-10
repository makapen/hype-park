import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  telephoneNumber: DS.attr('string'),
  city: DS.attr('string'),
  postalCode: DS.attr('string'),
  address: DS.attr('string'),
  email: DS.attr('string'),
  parkingSpots: DS.hasMany('parking-spot', { async: true})
});
