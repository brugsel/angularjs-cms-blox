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
