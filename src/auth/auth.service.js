'use strict';

angular.module('angularCmsBlox')
  .factory('authService', ['$resource', 'cmsConfig', function ($resource, cmsConfig) {

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
