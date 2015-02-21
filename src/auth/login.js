'use strict';

angular.module('angularCmsBlox')

  .directive('authLogin', ['$location', 'authService', function ($location, authService) {

    return {
      restrict: 'EA',
      replace: true,
      scope: {
      },
      templateUrl: 'auth/login.template.html',

      controller: ['$auth', function($auth){

        this.authenticate = function(provider) {
          $auth.authenticate(provider).then(function() {
            if (authService.getPath()) {
              $location.path(authService.getPath());
            }
          });
        };

        this.isAuthenticated = function() {
          return $auth.isAuthenticated();
        };

        this.login = function() {
          $auth.login({
            email: this.email,
            password: this.password
          });
        };

        this.logout = function() {
          $auth.logout();
        };

        this.login = function() {
          $auth.signup({
            email: this.email,
            password: this.password
          }).then(function (response) {
            console.log(response.data);
          });
        };

      }],

      controllerAs: 'ctrl',
      bindToController: true

    };

  }]);
