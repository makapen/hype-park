/* jshint node: true */
var deployTarget = process.env.deployTarget || 'local';
var deployTargetConfig = require('./' + deployTarget + '.json');

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'hype-park',
    environment: environment,
    contentSecurityPolicy: {
      'connect-src': "'self' wss://*.firebaseio.com https://hype-park.auth0.com" 
    },
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
        host: deployTargetConfig.apiServer.host
      }
    }
  };

  ENV['simple-auth'] = {
    authenticationRoute: 'login',
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
