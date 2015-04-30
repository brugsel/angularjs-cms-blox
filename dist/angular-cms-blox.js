'use strict';

/**
 * @name
 * @description
 */
angular.module('angularCmsBlox',['ngResource', 'ngCookies', 'ngAnimate', 'ngMaterial', 'ngMessages', 'satellizer', 'pascalprecht.translate', 'xeditable', 'angular-inview']);

angular.module('angularCmsBlox').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('auth/auth-buttons.template.html',
    "<span>\n" +
    "    <md-button class=\"auth-buttons\" ng-click=\"ctrl.action()\" >{{ctrl.label.key | translate}}</md-button>\n" +
    "</span>"
  );


  $templateCache.put('auth/login.template.html',
    "<div class=\"auth-login\">\n" +
    "\n" +
    "    <div ng-hide=\"ctrl.isAuthenticated()\">\n" +
    "\n" +
    "        <div layout=\"row\">\n" +
    "            <div flex=\"30\"></div>\n" +
    "            <div flex>\n" +
    "                <h2 cms-text=\"auth.title\"></h2>\n" +
    "                <md-button layout-fill class=\"md-primary md-raised\" ng-click=\"ctrl.authenticate('google')\">\n" +
    "                    <i class=\"fa fa-google\"></i> Google\n" +
    "                </md-button>\n" +
    "                <div class=\"signup-or-separator\">\n" +
    "                    <h6 class=\"text\" cms-text=\"auth.or\"></h6>\n" +
    "                    <hr>\n" +
    "                </div>\n" +
    "\n" +
    "                <form name=\"loginForm\">\n" +
    "\n" +
    "                    <md-input-container>\n" +
    "                        <label>{{'auth.email' | translate}}</label>\n" +
    "                        <input type=\"email\" name=\"email\" ng-model=\"ctrl.login.email\" required>\n" +
    "                        <div ng-messages=\"loginForm.email.$error\" ng-show=\"loginForm.email.$dirty && loginForm.email.$invalid\">\n" +
    "                            <div ng-message=\"required\">This is required!</div>\n" +
    "                            <div ng-message=\"email\">That's not an e-mail!</div>\n" +
    "                        </div>\n" +
    "                    </md-input-container>\n" +
    "                    <md-input-container>\n" +
    "                      <label>{{'auth.password' | translate}}</label>\n" +
    "                      <input type=\"password\" name=\"password\" ng-model=\"ctrl.login.password\" required md-maxlength=\"50\" minlength=\"4\">\n" +
    "                        <div ng-messages=\"loginForm.password.$error\" ng-show=\"loginForm.password.$dirty && loginForm.password.$invalid\">\n" +
    "                            <div ng-message=\"required\">This is required!</div>\n" +
    "                            <div ng-message=\"md-maxlength\">That's too long!</div>\n" +
    "                            <div ng-message=\"minlength\">That's too short!</div>\n" +
    "                        </div>\n" +
    "                    </md-input-container>\n" +
    "                    <md-input-container ng-hide=\"ctrl.isLogin\" class=\"animate\">\n" +
    "                      <label>{{'auth.password-confirm' | translate}}</label>\n" +
    "                      <input type=\"password\" name=\"passwordCheck\" ng-model=\"ctrl.login.passwordCheck\" required ng-if=\"!ctrl.isLogin\" dn-match=\"ctrl.login.password\">\n" +
    "                        <div ng-messages=\"loginForm.passwordCheck.$error\" ng-show=\"loginForm.passwordCheck.$dirty && loginForm.passwordCheck.$invalid\">\n" +
    "                            <div ng-message=\"required\">This is required!</div>\n" +
    "                            <div ng-message=\"match\">Password does not match!</div>\n" +
    "                        </div>\n" +
    "                    </md-input-container>\n" +
    "\n" +
    "                </form>\n" +
    "               <md-button ng-show=\"ctrl.isLogin\" class=\"md-raised\" ng-click=\"ctrl.login()\" aria-label=\"login\" ng-disabled=\"!loginForm.$valid\">\n" +
    "                    <span cms-text=\"auth.login\"></span>\n" +
    "                </md-button>\n" +
    "                <md-button ng-hide=\"ctrl.isLogin\" class=\"md-raised\" ng-click=\"ctrl.signup()\" aria-label=\"signup\" ng-disabled=\"!loginForm.$valid\">\n" +
    "                    <span cms-text=\"auth.signup\"></span>\n" +
    "                </md-button>\n" +
    "                <div layout=\"row\">\n" +
    "                    <div flex=\"50\" layout-align=\"left\">\n" +
    "                        <md-button class=\"pull-left\" ng-click=\"ctrl.switchSignup()\" aria-label=\"goto signup\">\n" +
    "                            <span ng-show=\"ctrl.isLogin\" cms-text=\"auth.to-signup\"></span>\n" +
    "                            <span ng-hide=\"ctrl.isLogin\" cms-text=\"auth.to-login\"></span>\n" +
    "                        </md-button>\n" +
    "                    </div>\n" +
    "                    <div flex=\"50\" layout-align=\"right\">\n" +
    "                        <md-button class=\"pull-right\" onclick=\"alert('Not implemented yet!')\" aria-label=\"password lost\">\n" +
    "                            <span cms-text=\"auth.lost\"></span>\n" +
    "                        </md-button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div flex=\"30\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "    <div ng-show=\"ctrl.isAuthenticated()\">\n" +
    "\n" +
    "        <div layout=\"row\">\n" +
    "            <div flex=\"30\"></div>\n" +
    "            <div flex>\n" +
    "                <h2>Logout</h2>\n" +
    "                <div layout=\"row\">\n" +
    "                    <div flex=\"50\" layout-align=\"left\">\n" +
    "                        <md-button class=\"md-raised\" ng-click=\"ctrl.logout()\">\n" +
    "                            Logout\n" +
    "                        </md-button>\n" +
    "                    </div>\n" +
    "                    <div flex=\"50\" layout-align=\"right\">\n" +
    "                        <md-button class=\"md-raised\" ng-click=\"ctrl.cancel()\">\n" +
    "                            Cancel\n" +
    "                        </md-button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div flex=\"30\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('cms/cms-control-panel.template.html',
    "<div class=\"cms-control-panel\" ng-show=\"ctrl.isAuthenticated()\">\n" +
    "\n" +
    "    <div class=\"panel-button\"><i class=\"fa fa-2x fa-cog\" ng-click=\"ctrl.showPanel()\"></i></div>\n" +
    "\n" +
    "    <div class=\"panel-widget\" ng-show=\"ctrl.panel\">\n" +
    "        <i class=\"fa fa-2x fa-edit\" ng-click=\"ctrl.toggleEditMode()\" ng-hide=\"ctrl.isEditable()\"></i>\n" +
    "        <i class=\"fa fa-2x fa-stop\" ng-click=\"ctrl.toggleEditMode()\" ng-show=\"ctrl.isEditable()\"></i>\n" +
    "        <i class=\"fa fa-2x fa-save\" ng-click=\"ctrl.save()\" ng-hide=\"ctrl.status.saved\"></i>\n" +
    "        <i class=\"fa fa-2x fa-ellipsis-h\" ng-show=\"ctrl.status.saved\"></i>\n" +
    "        <i class=\"fa fa-2x fa-undo\" ng-click=\"ctrl.undo()\"></i>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('cms/cms-text.template.html',
    "<span translate-cloak editable-textarea=\"ctrl.item.text\" onaftersave=\"ctrl.save()\" e-form=\"textBtnForm\" e-rows=\"{{ctrl.item.rows}}\" e-cols=\"{{ctrl.item.cols}}\">\n" +
    "  {{ctrl.item.text}} <i class=\"fa fa-edit\" ng-if=\"ctrl.isEditable()\" class=\"btn btn-sm\" ng-click=\"textBtnForm.$show()\" ng-hide=\"textBtnForm.$visible\"></i>\n" +
    "</span>\n"
  );


  $templateCache.put('landing/landing-default.template.html',
    "<div class=\"landing-default full-width\" layout=\"row\" layout-align=\"center center\" layout-fill>\n" +
    "  <div ng-transclude></div>\n" +
    "</div>\n"
  );


  $templateCache.put('landing/landing-title.template.html',
    "<div class=\"landing-title\" layout=\"row\" layout-align=\"center center\" layout-fill>\n" +
    "    <div class=\"full-width\" in-view=\"ctrl.startLoop()\">\n" +
    "\n" +
    "        <div ng-switch on=\"ctrl.settings.index\">\n" +
    "            <h1 class=\"animate-switch\" ng-switch-when=\"0\" translate=\"{{ctrl.settings.texts[ctrl.settings.index]}}\"></h1>\n" +
    "            <h1 class=\"animate-switch\" ng-switch-when=\"1\" translate=\"{{ctrl.settings.texts[ctrl.settings.index]}}\"></h1>\n" +
    "            <h1 class=\"animate-switch\" ng-switch-when=\"2\" translate=\"{{ctrl.settings.texts[ctrl.settings.index]}}\"></h1>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-show=\"ctrl.isEditable()\">\n" +
    "\n" +
    "          <div ng-repeat=\"text in ctrl.settings.texts\">\n" +
    "            <span cms-text=\"{{text}}\"></span><br>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n"
  );

}]);

'use strict';

angular.module('angularCmsBlox')

  .directive('authButtons', [function () {

    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'auth/auth-buttons.template.html',

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


angular.module('angularCmsBlox').directive('dnMatch', [function() {
  'use strict';

  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attrs, ctrl) {
      var modelToMatch = element.attr('dn-match');
      ctrl.$validators.match = function(modelValue, viewValue) {
        return viewValue === scope.$eval(modelToMatch);
      };
    }
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
  .factory('authService', ['$log', '$resource', '$auth', 'cmsConfig', '$rootScope', '$q', function ($log, $resource, $auth, cmsConfig, $rootScope, $q) {

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
      $rootScope.$emit('auth:logout');
    };

    var login = function(email, password) {
      $auth.login({
        email: email,
        password: password
      }).then(function(data) {
        $log.debug(data);
        $rootScope.$emit('auth:login');
      }, function(error) {
        $log.debug(error);
      });

    };

    var signup = function(email, password) {
      $auth.signup({
        email: email,
        password: password
      }).then(function (response) {
        $log.debug(response.data);
      });
    };

    var authenticate = function(provider) {

      var defer = $q. defer();

      $auth.authenticate(provider).then(function(data) {
        console.log(data);
        $rootScope.$emit('auth:login');
        defer.resolve();
      }, function(data) {
        console.log(data);
      });

      return defer.promise;
    };

    // Public API here
    return {
      isAuthorized: isAuthorized,
      isAuthenticated: isAuthenticated,
      logout: logout,
      login: login,
      signup: signup,
      authenticate: authenticate,
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
    pub: 0,
    one: 1,
    two: 2,
    three: 4,
    four: 8,
    five: 16
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
          authService.login(this.login.email, this.login.password);
        };

        this.logout = function() {
          authService.logout();
        };

        this.signup = function() {
          //TODO lvb, check password/password-confirm
          authService.signup(this.login.email, this.login.password);
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

  .controller('cmsControlPanelController', ['cmsService', 'authService', '$timeout', function(cmsService, authService, $timeout){

    var status = {
      saved: false
    };

    this.status = status;
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
      status.saved = true;
      cmsService.publishText().then(function() {
        $timeout(function() {
          status.saved = false;
        }, 1000);
      });
    };

    this.toggleEditMode = function() {
      cmsService.toggleEditMode();
    };

    this.isEditable = function() {
      return cmsService.isEditable();
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

  .controller('cmsTextController', ['$translate', 'cmsService', function($translate, cmsService){

    var item = {
      key: this.key
    };

    this.item = item;

    $translate(this.key).then(function (translation) {
      item.text = translation;
      item.cols = item.text.length>100?100:item.text.length;
      item.rows = Math.ceil(item.text.length/item.cols)+1;
    });

    this.save = function() {
      cmsService.savePageText(item.key, item.text);
    };

    this.isEditable = function() {
      return cmsService.isEditable();
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

  .run(['editableOptions', 'editableThemes',function(editableOptions, editableThemes) {

    editableOptions.theme = 'default';
    editableThemes['default'].submitTpl = '<md-button class="md-raised" type="submit"><i class="fa fa-check"></i></md-button>';
    editableThemes['default'].cancelTpl = '<md-button class="md-raised" type="button" ng-click="$form.$cancel()" tabindex="0"><i class="fa fa-remove"></i></md-button>';

  }]);


'use strict';

//TODO lvb, add cache for texts
angular.module('angularCmsBlox')
  .factory('cmsService', ['$rootScope', '$resource', '$q', '$translate', '$window', 'cmsConfig', function ($rootScope, $resource, $q, $translate, $window, cmsConfig) {

    var CMS = $resource(cmsConfig.url+'/:id', {id: '@id'});

    var unPublished;
    var currentLanguage;
    var editable = false;

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
        $rootScope.$emit('cms:savePageText');
      });

    };

    var publishText = function() {

      var defer = $q.defer();
      CMS.save(unPublished, function() {
        $translate.refresh(currentLanguage);
        $rootScope.$emit('cms:publishText');
        defer.resolve();
      });
      return defer.promise;
    };

    var undoText = function() {
      $translate.refresh(currentLanguage);
      $window.location.reload();
    };

    var toggleEditMode = function() {
      editable = !editable;
    };

    var isEditable = function() {
      return editable;
    };

    return {
      getPageText: getPageText,
      savePageText: savePageText,
      publishText: publishText,
      undoText: undoText,
      toggleEditMode: toggleEditMode,
      isEditable: isEditable
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

'use strict';

//TODO lvb, add cache for texts
angular.module('angularCmsBlox')
  .factory('configService', ['$resource', '$q', function ($resource, $q) {

    var config;

    var getConfig = function(url) {
      var defer = $q.defer();

      if (config) {
        defer.resolve(config);
      } else {
        var CONFIG = $resource(url);
        CONFIG.get({}, function(_config) {
          config = _config;
          defer.resolve(config);
        }, function(data) {
          defer.reject(data.status);
        });
      }
      return defer.promise;
    };

    return {
      getConfig: getConfig
    };

  }]);

'use strict';

/**
 * @ngdoc directive
 * @name www.directive:landingDefault
 * @description
 * # landingDefault
 */
angular.module('angularCmsBlox')

  .directive('cmsLandingDefault', [function () {

    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      templateUrl: 'landing/landing-default.template.html'
    };

  }]);

'use strict';

/**
 * @ngdoc directive
 * @name www.directive:landingTitle
 * @description
 * # landingTitle
 */
angular.module('angularCmsBlox')
  .directive('cmsLandingParallax', ['$window', function($window) {
  return {
    restrict: 'A',
    transclude: true,
    template: '<div ng-transclude></div>',
    scope: {
      ratio: '=',
      offset: '='
    },
    controllerAs: 'ctrl',
    bindToController: true,
    link: function($scope, element) {

      function calculateY() {
        var y = ((element.prop('offsetTop') - $window.pageYOffset) * ($scope.ratio ? $scope.ratio : 1.1 )) + ($scope.offset?$scope.offset:0);
        element.css('background-position', '50% ' +  y + 'px');
      }

      calculateY();

      angular.element($window).bind('scroll', calculateY);
      angular.element($window).bind('touchmove', calculateY);

    }
  };
}]);

'use strict';

/**
 * @ngdoc directive
 * @name www.directive:landingTitle
 * @description
 * # landingTitle
 */
angular.module('angularCmsBlox')

  .directive('cmsLandingTitle', [function () {

    return {
      restrict: 'EA',
      replace: false,
      scope: {
        text: '@',
        duration: '@'
      },
      templateUrl: 'landing/landing-title.template.html',
      controller: 'landingTitleController',
      controllerAs: 'ctrl',
      bindToController: true
    };

  }])

  .controller('landingTitleController', ['$rootScope', '$log', '$timeout', 'cmsService',function($rootScope, $log, $timeout, cmsService) {

    var texts = this.text.split(' ');
    var duration = this.duration || 3000;

    var next = function() {
      $timeout(function () {
        settings.next = settings.index+1;
        settings.index = undefined;
        $timeout(function () {
          settings.index = settings.next;
          if (settings.index > settings.texts.length) {
            settings.index = 0;
          }
          next();
        }, 1000);
      }, duration);
    };

    var settings = {
      index: undefined,
      texts: []
    };
    this.settings = settings;

    this.startLoop = function() {
      settings.texts = texts;
      $timeout(function () {
        settings.index = 0;
        next();
      }, 250);
    };

    this.isEditable = function() {
      return cmsService.isEditable();
    };



  }]);

'use strict';

/**
 * @ngdoc directive
 * @name www.directive:landing
 * @description
 * # landing
 */
angular.module('angularCmsBlox')

  .run(['editableOptions',function() {


  }]);

