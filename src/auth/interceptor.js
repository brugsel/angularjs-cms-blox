'use strict';

//TODO lvb, authenticator part of cms? configurable?
angular.module('angularCmsBlox')
  .constant('ACCESS_LEVELS', {
    pub: 1,
    user: 2,
    aso: 4,
    dooner: 8,
    root: 16
  })
  .config(function ($httpProvider) {

    var responseInterceptor =
      function ($q, $rootScope) {
        return {
          'response': function (resp) {

            console.log('URL: ' + resp.config.url);

            return resp;
          },
          'responseError': function (rejection) {
            // Handle errors
            switch (rejection.status) {
              case 401:
                $rootScope.$broadcast('auth:loginRequired');
                break;
              case 403:
                $rootScope.$broadcast('auth:forbidden');
                break;
              case 404:
                $rootScope.$broadcast('page:notFound');
                break;
              case 500:
                $rootScope.$broadcast('server:error');
                break;
            }

            return $q.reject(rejection);
          }
        };
      };

    $httpProvider.interceptors.push(responseInterceptor);

  })

  .run(['$rootScope','$location','$auth','authService','ACCESS_LEVELS', function ($rootScope, $location, $auth, authService, ACCESS_LEVELS) {

    // Set a watch on the $stateChangeStart
    $rootScope.$on('$stateChangeStart', function (evt, next) {

      if (next.accessLevel > ACCESS_LEVELS.pub) {
        if ($auth.isAuthenticated()) {

          authService.isAuthorized(next.accessLevel, function(authorized) {
            if (!authorized) {
              $location.path('/');
            }
          });

        } else {
          authService.setPath($location.path());
          $location.path('/login');
        }
      }

    });

    $rootScope.$on('auth:loginRequired', function () {
        authService.setPath($location.path());
        $location.path('/login');
    });

  }]);
