'use strict';

angular.module('angularCmsBloxDemo')
  .config(function ($stateProvider, ACCESS_LEVELS) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'src/login/index.html',
        accessLevel: ACCESS_LEVELS.pub
      });
  });
