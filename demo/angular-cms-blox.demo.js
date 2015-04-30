'use strict';

angular.module('angularCmsBloxDemo',['angularCmsBloxMock', 'ui.router'])
//angular.module('angularCmsBloxDemo',['angularCmsBlox','ui.router'])

  .config(function ($locationProvider) {
    $locationProvider.html5Mode(false).hashPrefix('!');
  })

  .config(['cmsConfigProvider', function(cmsConfigProvider){

    cmsConfigProvider.setPreferredLanguage('nl_NL');
    cmsConfigProvider.setCmsUrl('http://doon-platform-test.herokuapp.com/api/sandbox/doon/catalog/cms_www');

    cmsConfigProvider.setEmailConfig({
      loginUrl: 'http://doon-platform-test.herokuapp.com/auth/login',
      signupUrl: 'http://doon-platform-test.herokuapp.com/auth/signup'
    });

    cmsConfigProvider.setGoogleConfig({
      clientId: '402827681397-4bud9sjicgcshr9i5d6b1u9rmqccp3km.apps.googleusercontent.com',
      url: 'http://doon-platform-test.herokuapp.com/auth/google',
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

    cmsConfigProvider.setProfileUrl('http://doon-platform-test.herokuapp.com/auth/me');

    cmsConfigProvider.addCmsText('home');
    cmsConfigProvider.addCmsText('auth');

  }])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('purple')
      .accentPalette('orange');
  });
