'use strict';

/**
 * @ngdoc directive
 * @name www.directive:landingDefault
 * @description
 * # landingDefault
 */
angular.module('angularCmsBlox')

  .directive('cmsLandingDefault', [function () {

    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      templateUrl: 'landing/landing-default.template.html'
    };

  }]);
