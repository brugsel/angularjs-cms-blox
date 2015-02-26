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

        this.loginForm = {
        };

        this.isLogin = true;

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
            email: this.loginForm.email,
            password: this.loginForm.password
          });
        };

        this.logout = function() {
          $auth.logout();
        };

        this.signup = function() {
          $auth.signup({
            email: this.loginForm.email,
            password: this.loginForm.password
          }).then(function (response) {
            console.log(response.data);
          });
        };

        this.cancel = function() {
          if (authService.getPath()) {
            $location.path(authService.getPath());
          } else {
            $location.path('/');
          }
        };

        this.switch = function() {
          if (this.isLogin) {
            this.isLogin = false;
          } else {
            this.isLogin = true;
          }
        };

      }],

      controllerAs: 'ctrl',
      bindToController: true

    };

  }]);
