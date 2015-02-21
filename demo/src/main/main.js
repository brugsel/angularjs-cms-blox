'use strict';

angular.module('angularCmsBloxDemo')
  .config(function ($stateProvider, ACCESS_LEVELS) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'src/main/main.html',
        accessLevel: ACCESS_LEVELS.pub
      });
  });
