import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  parkingSpots: DS.hasMany('parking-spot', { async: true})
});
