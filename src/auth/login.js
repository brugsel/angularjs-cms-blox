'use strict';

angular.module('angularCmsBlox')

  .directive('authLogin', ['$location', 'authService', function ($location, authService) {

    return {
      restrict: 'EA',
      replace: true,
      scope: {
      },
      templateUrl: 'auth/login.template.html',

      controller: [function(){

        this.loginForm = {
        };

        this.isLogin = true;

        this.authenticate = function(provider) {
          authService.authenticate(provider).then(function() {
            if (authService.getPath()) {
              $location.path(authService.getPath());
            }
          });
        };

        this.isAuthenticated = function() {
          return authService.isAuthenticated();
        };

        this.login = function() {
          authService.login(this.loginForm.email, this.loginForm.password);
        };

        this.logout = function() {
          authService.logout();
        };

        this.signup = function() {
          authService.signup(this.loginForm.email, this.loginForm.password);
        };

        this.cancel = function() {
          if (authService.getPath()) {
            $location.path(authService.getPath());
          } else {
            $location.path('/');
          }
        };

        this.switchSignup = function() {
          this.isLogin = !this.isLogin;
        };

      }],

      controllerAs: 'ctrl',
      bindToController: true

    };

  }]);
