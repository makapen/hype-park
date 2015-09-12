import ajax from 'ic-ajax';
import Ember from 'ember';

var parkingSpotMarker =  Ember.Object.extend({
  isClickable: true,
  markerHasInfoWindow: false,
  icon: 'images/parking_marker_green.png'
})

export default Ember.Route.extend({
  model(params, transition) {
    var spotParams =  JSON.parse(transition.queryParams.spot);
    return parkingSpotMarker.create(spotParams);
  },

  afterModel: function() {
    return this.loadGoogleMap();
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('lat', model.lat);
    controller.set('lng', model.lng);
  },


  actions: {
    createOrLogin: function() {
      this.transitionTo('create-or-login', {
        queryParams: {
          address: this.controllerFor('parking-details').get('address'),
          addressLat: this.controllerFor('parking-details').get('addressLat'),
          addressLng: this.controllerFor('parking-details').get('addressLng'),
          selectedAddress: this.controllerFor('parking-details').get('selectedAddress'),
          spot: this.controllerFor('parking-details').get('spot')
        }
      });
    },
    dateChanged: function(date) {
      // this.modelFor('parking-details').set('startDate', date);
    }
  }
});
