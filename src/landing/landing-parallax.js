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
    link: function($scope, element) {

      var setPosition = function () {
        var calcValY = ((element.prop('offsetTop') - $window.pageYOffset) * ($scope.ratio ? $scope.ratio : 1.1 ))+($scope.offset?$scope.offset:0);

        // horizontal positioning
        element.css('background-position', "50% " +  calcValY + "px");

      };

      setPosition();

      angular.element($window).bind('scroll', setPosition);
      angular.element($window).bind('touchmove', setPosition);

    }
  };
}]);
