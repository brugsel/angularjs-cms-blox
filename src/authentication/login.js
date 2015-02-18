'use strict';

/**
 * @ngdoc directive
 * @name www.directive:cmsLogin
 * @description
 * # cmsLogin
 */
//TODO lvb, create seperate module?
angular.module('angularCmsBlox')
  .directive('cmsLogin', [function () {

    return {
      restrict: 'EA',
      replace: true,
      scope: {
      },
      templateUrl: 'authentication/login.html',
      controller: ['$rootScope', '$location', 'Loginservice', 'Authservice', function($rootScope, $location, Loginservice, Authservice){

        this.login = function () {

          if (this.cmsLoginForm.$valid) {

            Loginservice.login(this.login.username, this.login.password)
              .then(function () {
                if (Authservice.getPath()) {
                  $location.path(Authservice.getPath());
                } else {
                  $location.path('/');
                }
              }, function (err) {
                //TODO, lvb emit error
                console.log([err.data.error]);
              });

          }

          this.cmsLoginForm.$submitted = true;

          $rootScope.$broadcast('cms-event-logged-in');
        };

        this.isLoggedIn = function() {
          return Authservice.isLoggedIn();
        };

        this.isAuthorized = function(lvl) {
          return Authservice.isAuthorized(lvl);
        };

        this.logout = function() {
          Authservice.logout();
          $rootScope.$broadcast('cms-event-logged-out');
        };

      }],

      controllerAs: 'ctrl',
      bindToController: true

    };

  }])
;
