'use strict';

/**
 * @ngdoc provider
 * @name www.provider:config
 * @description
 * # config
 */
angular.module('angularCmsBlox').provider('cmsConfig', ['$translateProvider','$translatePartialLoaderProvider', '$authProvider', function ($translateProvider, $translatePartialLoaderProvider, $authProvider) {

  // Cors without credentials
  $authProvider.withCredentials = false;
  // Switch caching on for translations
  $translateProvider.useLoaderCache(true);

  this.loginPath = '/login';

  this.setLoginPath = function(path) {
    this.loginPath = path;
  };

  this.setPreferredLanguage = function(language) {
    this.preferredLanguage = language || 'nl_NL';
    $translateProvider.preferredLanguage(this.preferredLanguage);
  };

  this.setCmsUrl = function(url) {
    this.url = url || '/api/example/cms';
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: this.url+ '/'+'{part}.{lang}'
    });
  };

  this.setEmailConfig = function(email) {
    $authProvider.loginUrl = email.loginUrl || '/auth/login';
    $authProvider.signupUrl = email.signupUrl || '/auth/signup';
  };

  this.setGoogleConfig = function(google) {

    $authProvider.google(google || {
      clientId: '402827681397-4bud9sjicgcshr9i5d6b1u9rmqccp3km.apps.googleusercontent.com',
      url: 'http://localhost:3000/auth/google',
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
      scope: ['profile', 'email'],
      scopePrefix: 'openid',
      scopeDelimiter: ' ',
      requiredUrlParams: ['scope'],
      optionalUrlParams: ['display'],
      display: 'popup',
      type: '2.0',
      popupOptions: { width: 580, height: 400 }
    });

  };

  this.setProfileUrl = function(url) {
    this.profileUrl = url || '/auth/me';
  };

  this.addCmsText = function(part) {
    $translatePartialLoaderProvider.addPart(part);
  };

  this.$get = function () {
    return this;
  };

}]);
