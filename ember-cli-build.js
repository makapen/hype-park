/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
    Funnel = require('broccoli-funnel'),
    mergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'bower_components'
      ]
    }
  });

  app.import('bower_components/moment/min/moment.min.js');
  app.import('bower_components/auth0.js/build/auth0.js');
  app.import('bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js');
  app.import('bower_components/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js');

  var glyphFontTree = new Funnel('bower_components/bootstrap-sass/assets/fonts/bootstrap', {
    srcDir: '/',
    destDir: 'fonts/bootstrap'
  });

  var fontAwesomeTree = new Funnel('bower_components/font-awesome/fonts', {
    srcDir: '/',
    destDir: 'fonts'
  });

  return mergeTrees([app.toTree(), glyphFontTree, fontAwesomeTree]);

}
