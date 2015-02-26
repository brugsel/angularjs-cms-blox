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
