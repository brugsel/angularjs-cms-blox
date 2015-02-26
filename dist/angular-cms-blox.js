'use strict';

/**
 * @name
 * @description
 */
angular.module('angularCmsBlox',['ngResource', 'ngCookies', 'satellizer', 'pascalprecht.translate', 'xeditable']);

angular.module('angularCmsBlox').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('auth/login.template.html',
    "<div class=\"auth-login\">\n" +
    "\n" +
    "  <div ng-hide=\"ctrl.isAuthenticated()\">\n" +
    "    <h3>Sign in with:</h3>\n" +
    "\n" +
    "    <div class=\"container\">\n" +
    "      <a class=\"btn btn-block btn-social btn-google-plus\" ng-click=\"ctrl.authenticate('google')\">\n" +
    "        <i class=\"fa fa-google\"></i> Google\n" +
    "      </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-5\"></div>\n" +
    "      <div class=\"col-md-2 center\">or</div>\n" +
    "      <div class=\"col-md-5\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"container\">\n" +
    "      <form role=\"form\">\n" +
    "\n" +
    "        <div class=\"form-group input-group\">\n" +
    "          <span class=\"input-group-addon\" id=\"email-addon\"><i class=\"fa fa-envelope addon\"></i></span>\n" +
    "          <input type=\"text\" class=\"form-control\" id=\"email\" ng-model=\"ctrl.loginForm.email\" aria-describedby=\"email-addon\" placeholder=\"email address\">\n" +
    "        </div>\n" +
    "        <div class=\"form-group input-group\">\n" +
    "          <span class=\"input-group-addon\" id=\"password-addon\"><i class=\"fa fa-lock addon\"></i></span>\n" +
    "          <input type=\"password\" class=\"form-control\" id=\"pwd\" ng-model=\"ctrl.loginForm.password\" aria-describedby=\"password-addon\" placeholder=\"password\">\n" +
    "        </div>\n" +
    "        <div ng-hide=\"ctrl.isLogin\" class=\"form-group input-group\">\n" +
    "          <span class=\"input-group-addon\" id=\"password-check-addon\"><i class=\"fa fa-lock addon\"></i></span>\n" +
    "          <input type=\"password\" class=\"form-control\" id=\"pwd-check\" ng-model=\"ctrl.loginForm.passwordCheck\" aria-describedby=\"password-check-addon\" placeholder=\"password (confirm)\">\n" +
    "        </div>\n" +
    "        <a ng-show=\"ctrl.isLogin\" class=\"btn btn-block btn-primary\" ng-click=\"ctrl.login()\">\n" +
    "          Sign in with Email\n" +
    "        </a>\n" +
    "        <a ng-hide=\"ctrl.isLogin\" class=\"btn btn-block btn-primary\" ng-click=\"ctrl.signup()\">\n" +
    "          Sign up with Email\n" +
    "        </a>\n" +
    "        <a ng-click=\"ctrl.switch()\">Or signup first</a>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-show=\"ctrl.isAuthenticated()\">\n" +
    "    <h3>Logout</h3>\n" +
    "\n" +
    "    <div class=\"container\">\n" +
    "      <a class=\"btn btn-block btn-primary\" ng-click=\"ctrl.logout()\">\n" +
    "        Logout\n" +
    "      </a>\n" +
    "      <a class=\"btn btn-block btn-default\" ng-click=\"ctrl.cancel()\">\n" +
    "        Cancel\n" +
    "      </a>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
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

  }]);


'use strict';

//TODO lvb, add cache for texts
angular.module('angularCmsBlox')
  .factory('cmsService', ['$resource', '$q', 'cmsConfig', function ($resource, $q, cmsConfig) {

    var CMS = $resource(cmsConfig.url+'/:id', {id: '@id'});

    var getPageText = function(page, language) {
      var defer = $q.defer();

      var id = page+'.'+language;

      CMS.get({id: id}, function(translations) {
        defer.resolve(translations);
      }, function(data) {
        defer.reject(data.status);
      });

      return defer.promise;
    };

    // Public API here
    return {
      getPageText: getPageText,
      savePageText: function(){}
    };

  }]);

'use strict';

/**
 * @ngdoc provider
 * @name www.provider:config
 * @description
 * # config
 */
angular.module('angularCmsBlox').provider('cmsConfig', ['$translateProvider','$translatePartialLoaderProvider', function ($translateProvider, $translatePartialLoaderProvider) {

  this.setPreferredLanguage = function(language) {
    this.preferredLanguage = language || 'nl_NL';
    $translateProvider.preferredLanguage(this.preferredLanguage);
  };

  this.setUrl = function(url) {
    this.url = url || '/api/example/cms';
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: this.url+ '/{part}.{lang}'
    });
    $translatePartialLoaderProvider.addPart('home');
  };

  this.$get = function () {
    return this;
  };

}]);
