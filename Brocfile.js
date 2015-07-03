/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
    pickFiles = require('broccoli-static-compiler'),
    mergeTrees = require('broccoli-merge-trees');

var app = new EmberApp({
  sassOptions: {
    includePaths: [
      'bower_components'
    ]
  }
});

app.import('bower_components/auth0.js/build/auth0.js');
app.import('bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js');

var glyphFontTree = pickFiles('bower_components/bootstrap-sass/assets/fonts/bootstrap', {
  srcDir: '/',
  files: ['*'],
  destDir: '/fonts/bootstrap'
});


var fontAwesomeTree = pickFiles('bower_components/font-awesome/fonts', {
  srcDir: '/',
  files: ['*'],
  destDir: '/fonts'
});

module.exports = mergeTrees([app.toTree(), fontAwesomeTree, glyphFontTree]);
