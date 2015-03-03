'use strict';

angular.module('angularCmsBlox')

  .directive('authButtons', [function () {

    return {
      restrict: 'EA',
      replace: true,
      scope: {
      },
      templateUrl: 'auth/buttons.template.html',

      controller: ['authService', 'cmsConfig', function(authService, cmsConfig){

        this.isAuthenticated = function() {
          return authService.isAuthenticated();
        };

        this.logout = function() {
          authService.logout();
        };

        this.loginPath = cmsConfig.loginPath;

      }],

      controllerAs: 'ctrl',
      bindToController: true

    };

  }]);

