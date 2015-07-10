/* jshint node: true */
var deployTarget = process.env.deployTarget || 'local';
var deployTargetConfig = require('./' + deployTarget + '.json');

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'hype-park',
    environment: environment,
    firebase: 'https://hype-park.firebaseio.com/',
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      apiServer: {
        protocol: deployTargetConfig.apiServer.protocol,
        host: deployTargetConfig.apiServer.host,
        accountProvision: deployTargetConfig.apiServer.accountProvision
      }
    }
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' http://cdn.auth0.com https://cdn.auth0.com/client/8qZq3onkqMlG83YQQBxFq75SzZ7V3qPm.js?t1436466639729", // Allow scripts from https://cdn.mxpnl.com
    'font-src': "'self' http://fonts.gstatic.com", // Allow fonts to be loaded from http://fonts.gstatic.com
    'connect-src': "'self' localhost:3000 wss://*.firebaseio.com https://hype-park.auth0.com https://hype-park.firebaseapp.com", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
    'img-src': "'self'",
    'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
    'media-src': "'self'"
  };

  ENV['simple-auth'] = {
    authenticationRoute: 'index',
    routeAfterAuthentication: 'index',
    // routeIfAlreadyAuthenticated: 'orders',
    crossOriginWhitelist: [],
    authorizer: 'authorizer:auth0',
  };

  ENV['ember-cli-auth0-lock'] = {

  // [required] Auth0 credentials
  cid: '8qZq3onkqMlG83YQQBxFq75SzZ7V3qPm',
  domain: 'hype-park.auth0.com',

  cdnUrl: 'https://cdn.auth0.com/'

  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
