import Ember from 'ember';

export default Ember.Controller.extend({
  zoom: 17,
  centerLat: 47.599018,
  centerLng: -122.335178,
  markers: Ember.A([
    {
      lat: 47.599018,
      lng: -122.335178,
      title: 'Galvanize'
    }
  ]),
  actions: {
    test: function() {
      Ember.Logger.log('fired')
      this.get('markers').addObject({
        title: 'test',
        lat: 47.600343,
        lng: -122.333332
      })
    },

    submitPassword: function() {
      var password = this.get('password');
      if (password === 'HypePark!206') {
        this.set('isIn', true);
      }
    }
  }
});
