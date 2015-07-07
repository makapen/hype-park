import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('sign-up', function() {
    this.route('create-login');
    this.route('details');
  });
  this.route('logout');
  this.route('login');
  this.route('parking-map');
  this.route('parking-details');
  this.route('create-or-login');
  this.route('review-parking-details');
  this.route('pay');

});

export default Router;
