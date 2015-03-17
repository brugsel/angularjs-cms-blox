'use strict';

/**
 * @ngdoc directive
 * @name www.directive:landingTitle
 * @description
 * # landingTitle
 */
angular.module('angularCmsBlox')

  .directive('landingTitle', [function () {

    return {
      restrict: 'EA',
      replace: false,
      scope: {
        text: '@'
      },
      templateUrl: 'landing/landing-title.template.html',
      controller: 'landingTitleController',
      controllerAs: 'ctrl',
      bindToController: true
    };

  }])

  .controller('landingTitleController', [function(){
    alert(this.text);
    this.visible = false;
    this.setVisible = function() {
      this.visible = true;
    }

  }]);
