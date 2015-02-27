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

  .controller('cmsTextController', ['$translate', '$scope', '$auth', 'cmsService', function($translate, $scope, $auth, cmsService){

    $scope.key = this.key;

    $translate(this.key).then(function (translation) {
      $scope.text = translation;
      $scope.cols = $scope.text.length>100?100:$scope.text.length;
      $scope.rows = Math.ceil($scope.text.length/$scope.cols)+1;
    });

    this.save = function() {
      cmsService.savePageText($scope.key, $scope.text);
    };

    this.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

  }]);
