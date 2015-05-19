import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('account');
  this.route('sign-up', function() {
    this.route('create-login');
    this.route('details');
  });
});

export default Router;
