import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel(transition) {
    let selectedAddress = transition.queryParams.selectedAddress;
    let formatSelectedAddress = selectedAddress.replace(/\s/g, '+');
    ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+formatSelectedAddress,
      method: 'get'
    }).then( (res) => {
      var result = res.results[0];
      this.set('result', result);
      console.log('the selected address result ', result)
    })
  },

  model() {
    return Ember.A([
      {
        lat: this.get('result.geometry.location.lat'),
        lng: this.get('result.geometry.location.lng'),
        title: 'Single Result'
      }
    ])
  },

  afterModel: function() {
    return this.loadGoogleMap();
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('result', this.get('result'));
    this.controllerFor('parking-details').set('addressLat', this.get('result.geometry.location.lat'))
    this.controllerFor('parking-details').set('addressLng', this.get('result.geometry.location.lng'))
  },

  actions: {
    createOrLogin: function() {
      this.transitionTo('create-or-login');
    },
    dateChanged: function(date) {
      // this.modelFor('parking-details').set('startDate', date);
    }
  }
});
