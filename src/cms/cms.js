'use strict';

/**
 * @ngdoc directive
 * @name www.directive:cms
 * @description
 * # cms
 */
angular.module('angularCmsBlox')

  .run(['editableOptions',function(editableOptions) {

    editableOptions.theme = 'bs3';

  }]);

