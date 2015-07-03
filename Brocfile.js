/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  sassOptions: {
    includePaths: [
      'bower_components'
    ]
  }
});

app.import('bower_components/auth0.js/build/auth0.js');

module.exports = app.toTree();
