'use strict';

angular.module('angularCmsBloxDemo')
  .config(function ($stateProvider, ACCESS_LEVELS) {
    $stateProvider
      .state('secure', {
        url: '/secure',
        templateUrl: 'secure/index.html',
        accessLevel: ACCESS_LEVELS.user
      });
  });
