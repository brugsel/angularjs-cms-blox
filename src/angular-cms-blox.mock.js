'use strict';

angular.module('angularCmsBloxMock',['angularCmsBlox', 'ngMockE2E'])
  .config(['$translateProvider','$translatePartialLoaderProvider', function($translateProvider, $translatePartialLoaderProvider) {

    $translateProvider.preferredLanguage('nl_NL');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/api/example/cms/www.{part}.{lang}'
    });
    $translatePartialLoaderProvider.addPart('home');

  }]);
