'use strict';

//TODO lvb, add cache for texts
angular.module('angularCmsBlox')
  .factory('cmsService', ['$resource', '$q', '$translate', 'cmsConfig', function ($resource, $q, $translate, cmsConfig) {

    var CMS = $resource(cmsConfig.url+'/:id', {id: '@id'});

    var unPublished;

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
      var language = $translate.preferredLanguage();

      getPageText(part, language).then(function(translations) {
        dotSet(key, text, translations);
        unPublished = translations;
      });

    };

    var publishText = function() {
      CMS.save(unPublished, function() {
        $translate.refresh();
      });

    };

    return {
      getPageText: getPageText,
      savePageText: savePageText,
      publishText: publishText
    };

  }]);
