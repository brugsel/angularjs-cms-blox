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
