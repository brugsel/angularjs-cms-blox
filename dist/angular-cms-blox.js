'use strict';

/**
 * @name
 * @description
 */
angular.module('angularCmsBlox',['ngResource', 'ngCookies', 'pascalprecht.translate', 'xeditable']);

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

var mockData = {};

mockData.contentType = {'Content-type': 'application/json'};

mockData.wwwHome =
{
  '_id': {
    '$oid': '54cb4c34e4b0b3c7e59d03a0'
  },
  'site': 'www',
  'part': 'home',
  'lang': 'nl_NL',
  'home': {
    'title': 'Mooie titel in het Nederlands!',
    'subTitle': 'Nou dat!'
  }
};

mockData.wwwArray = [
  mockData.wwwHome
];

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
      templateUrl: 'cms/cms-text.html',
      controller: 'cmsTextController',
      controllerAs: 'ctrl',
      bindToController: true
    };

  }])

  .controller('cmsTextController', ['$translate', '$scope', 'Authservice', function($translate, $scope, Authservice){

    $translate(this.key).then(function (translation) {
      $scope.text = translation;
    });

    this.save = function() {
      //TODO lvb, implement
    };

    this.isLoggedIn = function() {
      return Authservice.isLoggedIn();
    };

  }]);

'use strict';

/**
 * @ngdoc directive
 * @name www.directive:dnCms
 * @description
 * # dnCms
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

'use strict';

angular.module('angularCmsBlox')
  .factory('Authservice', ['$cookieStore', 'ACCESS_LEVELS' ,function ($cookieStore, ACCESS_LEVELS) {

    var _user = $cookieStore.get('user');
    var _path;

    var isAuthorized = function (lvl) {
      if (_user) {
        return _user.role >= lvl;
      } else {
        return false;
      }
    };

    var setUser = function(user) {
      if (!user.role || user.role < 0) {
        user.role = ACCESS_LEVELS.pub;
      }
      _user = user;
      $cookieStore.put('user', _user);
    };

    return {
      isAuthorized: isAuthorized,
      isLoggedIn: function () {
        return _user ? true : false;
      },
      setUser: setUser,
      getUser: function () {
        return _user;
      },
      getToken: function () {
        return _user ? _user.token : '';
      },
      setToken: function (token) {
        if (_user) {
          _user.token=token;
        }
      },
      logout: function () {
        $cookieStore.remove('user');
        _user = null;
      },
      getPath: function() {
        return _path;
      },
      setPath: function(path) {
        _path = path;
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

'use strict';

angular.module('angularCmsBlox')
  .factory('Loginservice', ['$http', '$location', '$q', 'Authservice', 'ACCESS_LEVELS', function ($http, $location, $q, Authservice, ACCESS_LEVELS) {

    var login = function (username, password) {

      var deferred = $q.defer();

      var url = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/oauth/token';

      var xsrf = {
        grant_type: 'password',
        username: username,
        password: password
      };

      $http({
        method: 'POST',
        url: url,
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
          }
          return str.join('&');
        },
        data: xsrf,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).success(function (data) {

        var user = {
          role: ACCESS_LEVELS.user, //TODO lvb, rollen in backend overnermen.
          username: username,
          token: data.access_token
        };

        Authservice.setUser(user);

        deferred.resolve(data);

      }).catch(function (reason) {
        deferred.reject(reason);
      });

      return deferred.promise;

    };

    var logoff = function() {
      Authservice.logoff();
    };

    return {
      login: login,
      logoff: logoff
    };

  }]);
