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

    var requestInterceptor =
      function ($q, $rootScope, Authservice, ACCESS_LEVELS) {
        return {
          'request': function (req) {

            req.headers = req.headers || {};
            if (Authservice.isAuthorized(ACCESS_LEVELS.user) && !req.headers.Authorization && req.url.indexOf('/oauth/token')===-1) {
              console.log('Bearer headers added!');
              req.headers.Authorization = 'Bearer '+ Authservice.getToken();
            }

            return req;
          },
          'requestError': function (reqErr) {
            return reqErr;
          }
        };
      };

    var responseInterceptor =
      function ($q, $rootScope, Authservice) {
        return {
          'response': function (resp) {
            if (resp.config.url === '/oauth/token') {
              Authservice.setToken(resp.data.access_token);
            }
            return resp;
          },
          'responseError': function (rejection) {
            // Handle errors
            switch (rejection.status) {
              case 401:
                if (rejection.config.url !== '/oauth/token') {
                  $rootScope.$broadcast('auth:loginRequired');
                }
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

    $httpProvider.interceptors.push(requestInterceptor);
    $httpProvider.interceptors.push(responseInterceptor);

  })

  .run(function ($rootScope, $location, Authservice, ACCESS_LEVELS) {

    // Set a watch on the $routeChangeStart
    $rootScope.$on('$stateChangeStart',
      function (evt, next) {

        if (next.accessLevel > ACCESS_LEVELS.pub) {
          if (!Authservice.isAuthorized(next.accessLevel)) {
            if (Authservice.isLoggedIn()) {
              $location.path('/');
            } else {
              Authservice.setPath($location.path());
              $location.path('/login');
            }
          }
        }

      });

    $rootScope.$on('auth:loginRequired',
      function () {
        Authservice.setPath($location.path());
        $location.path('/login');

      });

  })
;
