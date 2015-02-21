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
