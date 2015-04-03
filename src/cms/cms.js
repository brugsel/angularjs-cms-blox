'use strict';

/**
 * @ngdoc directive
 * @name www.directive:cms
 * @description
 * # cms
 */
angular.module('angularCmsBlox')

  .run(['editableOptions', 'editableThemes',function(editableOptions, editableThemes) {

    editableOptions.theme = 'default';
    editableThemes['default'].submitTpl = '<md-button class="md-raised" type="submit"><i class="fa fa-check"></i></md-button>';
    editableThemes['default'].cancelTpl = '<md-button class="md-raised" type="button" ng-click="$form.$cancel()" tabindex="0"><i class="fa fa-remove"></i></md-button>';

  }]);

