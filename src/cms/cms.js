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

  }])
  .config(['$translateProvider', function ($translateProvider) {

    // Overruled by the implementing app
    $translateProvider.translations({
      'home': {
        'title': 'Titel in het Nederlandse!'
      }
    });

  }]);

