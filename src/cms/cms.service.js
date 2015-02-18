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
