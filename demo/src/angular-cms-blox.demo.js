'use strict';

angular.module('angularCmsBloxDemo',['angularCmsBloxMock', 'ui.router'])

  .config(function ($locationProvider) {
    $locationProvider.html5Mode(false).hashPrefix('!');
  })

  .config(['cmsConfigProvider', function(cmsConfigProvider){

    cmsConfigProvider.setPreferredLanguage('nl_NL');
    cmsConfigProvider.setUrl('http://api.cms.org/api/sandbox/angular/catalog/cms.www');

  }]);
