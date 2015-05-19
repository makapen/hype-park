import Auth0Authenticator from '../utils/auth0-simple-authenticator';
import Auth0SignupAuthenticator from '../utils/auth0-signup-authenticator';
import Auth0TokenAuthenticator from '../utils/auth0-token-authenticator';
import Auth0Authorizer from '../utils/auth0-authorizer';

export function initialize(container, application) {
  application.inject('authenticator', 'store', 'store:main');
  application.inject('authorizer', 'store', 'store:main');

  container.register('authenticator:auth0', Auth0Authenticator);
  container.register('authenticator:auth0-signup', Auth0SignupAuthenticator);
  container.register('authenticator:auth0-token', Auth0TokenAuthenticator);
  container.register('authorizer:auth0', Auth0Authorizer);
  container.register('authorizer:auth0-signup', Auth0Authorizer);
}

export default {
  name: 'simple-auth-authenticator',
  before: 'simple-auth',
  after: 'store',
  initialize: initialize
};
