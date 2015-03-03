'use strict';

/**
 * @ngdoc directive
 * @name www.directive:cmsControlPanel
 * @description
 * # cmsControlPanel
 */
angular.module('angularCmsBlox')

  .directive('cmsControlPanel', [function () {

    return {
      restrict: 'EA',
      replace: false,
      scope: {
      },
      templateUrl: 'cms/cms-control-panel.template.html',
      controller: 'cmsControlPanelController',
      controllerAs: 'ctrl',
      bindToController: true
    };

  }])

  .controller('cmsControlPanelController', ['$scope', 'cmsService', 'authService', '$timeout', function($scope, cmsService, authService, $timeout){

    this.panel = false;

    this.showPanel = function() {
      this.panel = !this.panel;
    };

    this.isAuthenticated = function() {
      return authService.isAuthenticated();
    };

    this.undo = function() {
      cmsService.undoText();
    };

    this.save = function() {
      $scope.saved = true;
      cmsService.publishText().then(function() {
        $timeout(function() {
          $scope.saved = false;
        }, 1000);
      });

    };

  }]);
