'use strict';

angular.module('angularCmsBloxDemo',['angularCmsBloxMock', 'ui.router'])

  .config(function ($locationProvider) {
    $locationProvider.html5Mode(false).hashPrefix('!');
  })

  .config(['$translateProvider','$translatePartialLoaderProvider', function($translateProvider, $translatePartialLoaderProvider) {

    $translateProvider.preferredLanguage('nl_NL');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/api/example/cms/www.{part}.{lang}'
    });
    $translatePartialLoaderProvider.addPart('home');

  }]);
