import Base from 'simple-auth/authorizers/base';

export default Base.extend({
  authorize: function(jqXHR) {
    if (this.get('session.isAuthenticated')) {
      console.log('auth');
      jqXHR.setRequestHeader('Authorization', 'Auth0 ' + this.get('session.auth0Token'));
    }
  }
});
