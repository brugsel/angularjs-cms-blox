'use strict';

/**
 * @name
 * @description
 */
angular.module('angularCmsBlox',['ngResource', 'ngCookies', 'ngAnimate', 'satellizer', 'pascalprecht.translate', 'xeditable']);

angular.module('angularCmsBlox').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('auth/buttons.template.html',
    "<ul class=\"auth-buttons nav navbar-nav navbar-right\">\n" +
    "    <li ng-hide=\"ctrl.isAuthenticated()\"><a href=\"/#!{{ctrl.loginPath}}\">{{'auth.login' | translate}}</a></li>\n" +
    "    <li ng-show=\"ctrl.isAuthenticated()\"><a ng-click=\"ctrl.logout()\">{{'auth.logout' | translate}}</a></li>\n" +
    "</ul>\n"
  );


  $templateCache.put('auth/login.template.html',
    "<div class=\"auth-login\">\n" +
    "\n" +
    "  <div ng-hide=\"ctrl.isAuthenticated()\">\n" +
    "\n" +
    "    <div class=\"container\">\n" +
    "      <h3 cms-text=\"auth.title\"></h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"container\">\n" +
    "      <a class=\"btn btn-block btn-social btn-google-plus\" ng-click=\"ctrl.authenticate('google')\">\n" +
    "        <i class=\"fa fa-google\"></i> Google\n" +
    "      </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"container\">\n" +
    "      <div class=\"signup-or-separator\">\n" +
    "        <h6 class=\"text\" cms-text=\"auth.or\"></h6>\n" +
    "        <hr>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"container\">\n" +
    "      <form role=\"form\">\n" +
    "\n" +
    "        <div class=\"form-group input-group\">\n" +
    "          <span class=\"input-group-addon\" id=\"email-addon\"><i class=\"fa fa-envelope addon\"></i></span>\n" +
    "          <input type=\"text\" class=\"form-control\" id=\"email\" ng-model=\"ctrl.loginForm.email\" aria-describedby=\"email-addon\" placeholder=\"{{'auth.email' | translate}}\">\n" +
    "        </div>\n" +
    "        <div class=\"form-group input-group\">\n" +
    "          <span class=\"input-group-addon\" id=\"password-addon\"><i class=\"fa fa-lock addon\"></i></span>\n" +
    "          <input type=\"password\" class=\"form-control\" id=\"pwd\" ng-model=\"ctrl.loginForm.password\" aria-describedby=\"password-addon\" placeholder=\"{{'auth.password' | translate}}\">\n" +
    "        </div>\n" +
    "        <div ng-hide=\"ctrl.isLogin\">\n" +
    "          <div class=\"form-group input-group animate\">\n" +
    "            <span class=\"input-group-addon\" id=\"password-check-addon\"><i class=\"fa fa-lock addon\"></i></span>\n" +
    "            <input type=\"password\" class=\"form-control\" id=\"pwd-check\" ng-model=\"ctrl.loginForm.passwordCheck\" aria-describedby=\"password-check-addon\" placeholder=\"{{'auth.password-confirm' | translate}}\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </form>\n" +
    "        <a ng-show=\"ctrl.isLogin\" class=\"btn btn-block btn-primary\" ng-click=\"ctrl.login()\" cms-text=\"auth.login\"></a>\n" +
    "        <a ng-hide=\"ctrl.isLogin\" class=\"btn btn-block btn-primary\" ng-click=\"ctrl.signup()\" cms-text=\"auth.signup\"></a>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-6\">\n" +
    "          <a class=\"pull-left\" ng-click=\"ctrl.switch()\" cms-text=\"auth.signup\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-6\">\n" +
    "          <a class=\"pull-right\" onclick=\"alert('Not implemented yet!')\" cms-text=\"auth.lost\"></a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
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


  $templateCache.put('cms/cms-control-panel.template.html',
    "<div class=\"cms-control-panel\" ng-show=\"ctrl.isAuthenticated()\">\n" +
    "\n" +
    "    <div class=\"panel-button pull-right\"><i class=\"fa fa-2x fa-cog\" ng-click=\"ctrl.showPanel()\"></i></div>\n" +
    "\n" +
    "    <div class=\"panel-widget\" ng-show=\"ctrl.panel\">\n" +
    "        <i class=\"fa fa-2x fa-save\" ng-click=\"ctrl.save()\" ng-hide=\"saved\"></i>\n" +
    "        <i class=\"fa fa-2x fa-ellipsis-h\" ng-show=\"saved\"></i>\n" +
    "        <i class=\"fa fa-2x fa-undo\" ng-click=\"ctrl.undo()\"></i>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('cms/cms-text.template.html',
    "<span translate-cloak editable-textarea=\"text\" onaftersave=\"ctrl.save()\" e-form=\"textBtnForm\" e-rows=\"{{rows}}\" e-cols=\"{{cols}}\">\n" +
    "  {{text}} <i class=\"fa fa-edit\" ng-if=\"ctrl.isAuthenticated()\" class=\"btn btn-sm\" ng-click=\"textBtnForm.$show()\" ng-hide=\"textBtnForm.$visible\"></i>\n" +
    "</span>\n"
  );

}]);

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


'use strict';

/**
 * @name www.directive:auth
 * @description
 */
angular.module('angularCmsBlox')

  .config([function() {

  }]);

'use strict';

angular.module('angularCmsBlox')
  .factory('authService', ['$resource', '$auth', 'cmsConfig', function ($resource, $auth, cmsConfig) {

    var Me = $resource(cmsConfig.profileUrl);
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

    var isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    var logout = function() {
      $auth.logout();
    };

    // Public API here
    return {
      isAuthorized: isAuthorized,
      isAuthenticated: isAuthenticated,
      logout: logout,
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

  .run(['$rootScope','$location','authService','ACCESS_LEVELS', function ($rootScope, $location, authService, ACCESS_LEVELS) {

    // Set a watch on the $stateChangeStart
    $rootScope.$on('$stateChangeStart', function (evt, next) {

      if (next.accessLevel > ACCESS_LEVELS.pub) {
        if (authService.isAuthenticated()) {

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
 * @name www.directive:cmsControlPanel
 * @description
 * # cmsControlPanel
 */
angular.module('angularCmsBlox')

  .directive('cmsControlPanel', [function () {

    return {
      restrict: 'EA',
      replace: false,
      scope: {
      },
      templateUrl: 'cms/cms-control-panel.template.html',
      controller: 'cmsControlPanelController',
      controllerAs: 'ctrl',
      bindToController: true
    };

  }])

  .controller('cmsControlPanelController', ['$scope', 'cmsService', 'authService', '$timeout', function($scope, cmsService, authService, $timeout){

    this.panel = false;

    this.showPanel = function() {
      this.panel = !this.panel;
    };

    this.isAuthenticated = function() {
      return authService.isAuthenticated();
    };

    this.undo = function() {
      cmsService.undoText();
    };

    this.save = function() {
      $scope.saved = true;
      cmsService.publishText().then(function() {
        $timeout(function() {
          $scope.saved = false;
        }, 1000);
      });

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

  .controller('cmsTextController', ['$translate', '$scope', 'authService', 'cmsService', function($translate, $scope, authService, cmsService){

    $scope.key = this.key;

    $translate(this.key).then(function (translation) {
      $scope.text = translation;
      $scope.cols = $scope.text.length>100?100:$scope.text.length;
      $scope.rows = Math.ceil($scope.text.length/$scope.cols)+1;
    });

    this.save = function() {
      cmsService.savePageText($scope.key, $scope.text);
    };

    this.isAuthenticated = function() {
      return authService.isAuthenticated();
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
  .factory('cmsService', ['$resource', '$q', '$translate', '$window', 'cmsConfig', function ($resource, $q, $translate, $window, cmsConfig) {

    var CMS = $resource(cmsConfig.url+'/:id', {id: '@id'});

    var unPublished;
    var currentLanguage;

    var dotSet = function (exp, value, scope) {
      var levels = exp.split('.');
      var max_level = levels.length - 1;
      var target = scope;
      levels.some(function (level, i) {
        if (typeof level === 'undefined') {
          return true;
        }
        if (i === max_level) {
          target[level] = value;
        } else {
          var obj = target[level] || {};
          target[level] = obj;
          target = obj;
        }
      });
    };

    var getPageText = function(part, language) {
      var defer = $q.defer();

      var id = part +'.'+language;

      CMS.get({id: id}, function(translations) {
        defer.resolve(translations);
      }, function(data) {
        defer.reject(data.status);
      });

      return defer.promise;
    };

    var savePageText = function(key, text) {

      var part = key.split('.')[0];
      currentLanguage = $translate.preferredLanguage();

      getPageText(part, currentLanguage).then(function(translations) {
        dotSet(key, text, translations);
        unPublished = translations;
      });

    };

    var publishText = function() {

      var defer = $q.defer();
      CMS.save(unPublished, function() {
        $translate.refresh(currentLanguage);
        defer.resolve();
      });
      return defer.promise;
    };

    var undoText = function() {
      $translate.refresh(currentLanguage);
      $window.location.reload();
    };

    return {
      getPageText: getPageText,
      savePageText: savePageText,
      publishText: publishText,
      undoText: undoText
    };

  }]);

'use strict';

/**
 * @ngdoc provider
 * @name www.provider:config
 * @description
 * # config
 */
angular.module('angularCmsBlox').provider('cmsConfig', ['$translateProvider','$translatePartialLoaderProvider', '$authProvider', function ($translateProvider, $translatePartialLoaderProvider, $authProvider) {

  // Cors without credentials
  $authProvider.withCredentials = false;
  // Switch caching on for translations
  $translateProvider.useLoaderCache(true);

  this.loginPath = '/login';

  this.setLoginPath = function(path) {
    this.loginPath = path;
  };

  this.setPreferredLanguage = function(language) {
    this.preferredLanguage = language || 'nl_NL';
    $translateProvider.preferredLanguage(this.preferredLanguage);
  };

  this.setCmsUrl = function(url) {
    this.url = url || '/api/example/cms';
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: this.url+ '/'+'{part}.{lang}'
    });
  };

  this.setEmailConfig = function(email) {
    $authProvider.loginUrl = email.loginUrl || '/auth/login';
    $authProvider.signupUrl = email.signupUrl || '/auth/signup';
  };

  this.setGoogleConfig = function(google) {

    $authProvider.google(google || {
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

  };

  this.setProfileUrl = function(url) {
    this.profileUrl = url || '/auth/me';
  };

  this.addCmsText = function(part) {
    $translatePartialLoaderProvider.addPart(part);
  };

  this.$get = function () {
    return this;
  };

}]);
