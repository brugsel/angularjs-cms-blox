'use strict';

angular.module('angularCmsBlox')

  .directive('authButtons', [function () {

    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'auth/buttons.template.html',

      controller: ['authService', 'cmsConfig', '$location', '$rootScope', function(authService, cmsConfig, $location, $rootScope){

        this.isAuthenticated = function() {
          return authService.isAuthenticated();
        };

        this.label = {
          key: authService.isAuthenticated()? 'auth.logout': 'auth.login'
        };

        this.action = function() {
          if (authService.isAuthenticated()) {
            authService.logout();
          } else {
            $location.path(cmsConfig.loginPath);
          }
        };

        var label = this.label;

        $rootScope.$on('auth:login', function() {
          label.key = 'auth.logout';
        });

        $rootScope.$on('auth:logout', function() {
          label.key = 'auth.login';
        });


      }],

      controllerAs: 'ctrl',
      bindToController: true

    };

  }]);

