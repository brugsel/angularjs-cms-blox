'use strict';

angular.module('angularCmsBlox')

  .directive('authButtons', [function () {

    return {
      restrict: 'EA',
      replace: true,
      scope: {
      },
      templateUrl: 'auth/buttons.template.html',

      controller: ['$auth', 'cmsConfig', function($auth, cmsConfig){

        this.isAuthenticated = function() {
          return $auth.isAuthenticated();
        };

        this.logout = function() {
          $auth.logout();
        };

        this.loginPath = cmsConfig.loginPath;

      }],

      controllerAs: 'ctrl',
      bindToController: true

    };

  }]);

