'use strict';

/**
 * @ngdoc directive
 * @name www.directive:cmsText
 * @description
 * # cmsText
 */
angular.module('angularCmsBlox')

  .directive('cmsText', [function () {

    return {
      restrict: 'EA',
      replace: false,
      scope: {
        key: '@cmsText'
      },
      templateUrl: 'cms/cms-text.template.html',
      controller: 'cmsTextController',
      controllerAs: 'ctrl',
      bindToController: true
    };

  }])

  .controller('cmsTextController', ['$translate', 'cmsService', function($translate, cmsService){

    var item = {
      key: this.key
    };

    this.item = item;

    $translate(this.key).then(function (translation) {
      item.text = translation;
      item.cols = item.text.length>100?100:item.text.length;
      item.rows = Math.ceil(item.text.length/item.cols)+1;
    });

    this.save = function() {
      cmsService.savePageText(item.key, item.text);
    };

    this.isEditable = function() {
      return cmsService.isEditable();
    };

  }]);
