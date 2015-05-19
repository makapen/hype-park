/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

//app.import('bower_components/auth0-lock/build/auth0-lock.js');
app.import('bower_components/auth0.js/build/auth0.js');

module.exports = app.toTree();
