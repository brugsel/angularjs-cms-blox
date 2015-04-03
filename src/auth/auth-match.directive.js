angular.module('angularCmsBlox').directive('dnMatch', [function() {
  'use strict';

  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attrs, ctrl) {
      var modelToMatch = element.attr('dn-match');
      ctrl.$validators.match = function(modelValue, viewValue) {
        return viewValue === scope.$eval(modelToMatch);
      };
    }
  };
}]);
