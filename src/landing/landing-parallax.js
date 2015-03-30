'use strict';

/**
 * @ngdoc directive
 * @name www.directive:landingTitle
 * @description
 * # landingTitle
 */
angular.module('angularCmsBlox')
  .directive('cmsLandingParallax', ['$window', function($window) {
  return {
    restrict: 'A',
    transclude: true,
    template: '<div ng-transclude></div>',
    scope: {
      ratio: '=',
      offset: '='
    },
    controllerAs: 'ctrl',
    bindToController: true,
    link: function($scope, element) {

      function calculateY() {
        var y = ((element.prop('offsetTop') - $window.pageYOffset) * ($scope.ratio ? $scope.ratio : 1.1 )) + ($scope.offset?$scope.offset:0);
        element.css('background-position', '50% ' +  y + 'px');
      }

      calculateY();

      angular.element($window).bind('scroll', calculateY);
      angular.element($window).bind('touchmove', calculateY);

    }
  };
}]);
