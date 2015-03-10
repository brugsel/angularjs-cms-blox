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

      $auth.authenticate(provider).then(function() {
        $rootScope.$emit('auth:login');
        defer.resolve();
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
