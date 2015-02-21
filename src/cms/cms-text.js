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
      templateUrl: 'cms/cms-text.template.html',
      controller: 'cmsTextController',
      controllerAs: 'ctrl',
      bindToController: true
    };

  }])

  .controller('cmsTextController', ['$translate', '$scope', '$auth', function($translate, $scope, $auth){

    $translate(this.key).then(function (translation) {
      $scope.text = translation;
    });

    this.save = function() {
      //TODO lvb, implement
    };

    this.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

  }]);
