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
