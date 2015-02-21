'use strict';

/**
 * @name
 * @description
 */
angular.module('angularCmsBlox',['ngResource', 'ngCookies', 'satellizer', 'pascalprecht.translate', 'xeditable']);

angular.module('angularCmsBlox').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('auth/login.template.html',
    "<div class=\"container\">\n" +
    "  <button ng-hide=\"ctrl.isAuthenticated()\" ng-click=\"ctrl.authenticate('google')\">Sign in with Google</button>\n" +
    "  <button ng-show=\"ctrl.isAuthenticated()\" ng-click=\"ctrl.logout()\">Logout</button>\n" +
    "</div>\n"
  );


  $templateCache.put('cms/cms-text.template.html',
    "<span translate-cloak editable-text=\"text\" onaftersave=\"ctrl.save()\" e-form=\"textBtnForm\">\n" +
    "  {{text}} <i class=\"fa fa-edit\" ng-if=\"ctrl.isAuthenticated()\" class=\"btn btn-sm\" ng-click=\"textBtnForm.$show()\" ng-hide=\"textBtnForm.$visible\"></i>\n" +
    "</span>\n"
  );

}]);

'use strict';

/**
 * @name www.directive:auth
 * @description
 */
angular.module('angularCmsBlox')

  .config(function($authProvider) {

    $authProvider.google({
      clientId: '402827681397-4bud9sjicgcshr9i5d6b1u9rmqccp3km.apps.googleusercontent.com',
      url: 'http://localhost:3000/auth/google',
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
      scope: ['profile', 'email'],
      scopePrefix: 'openid',
      scopeDelimiter: ' ',
      requiredUrlParams: ['scope'],
      optionalUrlParams: ['display'],
      display: 'popup',
      type: '2.0',
      popupOptions: { width: 580, height: 400 }
    });

  });

'use strict';

angular.module('angularCmsBlox')
  .factory('authService', ['$resource', function ($resource) {

    //TOO lvb, make configurable
    var Me = $resource('/auth/me');
    var me;
    var path;

    var isAuthorized = function(accessLevel, callback) {

      Me.get(function(data) {
        me = data;
        if (me.role >= accessLevel) {
          callback(true);
        } else {
          callback(false);
        }
      });
    };

    // Public API here
    return {
      isAuthorized: isAuthorized,
      getPath: function() {
        return path;
      },
      setPath: function(data) {
        path = data;
      }
    };

  }]);

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

'use strict';

/**
 * @ngdoc directive
 * @name www.directive:cmsText
 * @description
 * # cmsText
 */
angular.module('angularCmsBlox')

  .directive('cmsText', [function () {

    return {
      restrict: 'EA',
      replace: false,
      scope: {
        key: '@cmsText'
      },
      templateUrl: 'cms/cms-text.template.html',
      controller: 'cmsTextController',
      controllerAs: 'ctrl',
      bindToController: true
    };

  }])

  .controller('cmsTextController', ['$translate', '$scope', '$auth', function($translate, $scope, $auth){

    $translate(this.key).then(function (translation) {
      $scope.text = translation;
    });

    this.save = function() {
      //TODO lvb, implement
    };

    this.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

  }]);

'use strict';

/**
 * @ngdoc directive
 * @name www.directive:cms
 * @description
 * # cms
 */
angular.module('angularCmsBlox')

  .run(['editableOptions',function(editableOptions) {

    editableOptions.theme = 'bs3';

  }])
  .config(['$translateProvider', function ($translateProvider) {

    // Overruled by the implementing app
    $translateProvider.translations({
      'home': {
        'title': 'Titel in het Nederlandse!'
      }
    });

  }]);


'use strict';

//TODO lvb, add cache for texts
angular.module('angularCmsBlox')
  .factory('cmsService', ['$resource', '$q', function ($resource, $q) {

    //TOO lvb, make configurable
    var CMS = $resource('/api/example/cms');

    //TODO lvb, add language
    var getPageText = function(site, page) {
      var defer = $q.defer();

      var param = {
        q: {
          site: site,
          page: page
        },
        f: {
          text: 1
        }
      };

      CMS.query(param, function(translations) {
        defer.resolve(translations);
      }, function(data) {
        defer.reject(data.status);
      });

      return defer.promise;
    };

    // Public API here
    return {
      getPageText: getPageText
    };

  }]);
