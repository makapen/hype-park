import config from '../config/environment';

var auth0Config = config['ember-cli-auth0-lock'];

var auth0 = new Auth0({
  domain:       'makapen-tyler.auth0.com', //auth0Config.domain,
  clientID:     'aKBHYmEpadufVFzRJVhsd5j2dkougx0D'//auth0Config.cid
});

export function initialize(container, application) {
  container.register('auth0:main', auth0, { instantiate: false });
  application.inject('authenticator', 'auth0', 'auth0:main');
  application.inject('authorizer', 'auth0', 'auth0:main');
  application.inject('store', 'auth0', 'auth0:main');
  application.inject('adapter', 'auth0', 'auth0:main');
}

export default {
  name: 'auth0',
  before: 'store',
  initialize: initialize
};
