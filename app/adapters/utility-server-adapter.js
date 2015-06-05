import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: config.APP.apiServer.protocol + config.APP.apiServer.host,
  namespace: 'api',
  pathForType: function(type) {
    var pluralized = Ember.String.pluralize(type);
    return Ember.String.dasherize(pluralized);
  }
});
