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

  .controller('cmsControlPanelController', ['cmsService', 'authService', '$timeout', function(cmsService, authService, $timeout){

    var status = {
      saved: false
    };

    this.status = status;
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
      status.saved = true;
      cmsService.publishText().then(function() {
        $timeout(function() {
          status.saved = false;
        }, 1000);
      });

    };

  }]);
