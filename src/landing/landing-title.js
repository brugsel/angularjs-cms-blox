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

  .controller('landingTitleController', ['$log', '$timeout',function($log, $timeout){

    var texts = this.text.split(' ');

    var next = function() {
      settings.index++;
      if (settings.index >= settings.texts.length) {
        settings.index = 0;
      }
      $log.debug(settings.index);
      $timeout(function () {
        next();
      }, 2500);
    };

    var settings = {
      index: -1,
      texts: []
    };
    this.settings = settings;

    this.startLoop = function() {
      $timeout(function() {
        next();
        settings.texts = texts;
      }, 250);

    };

  }]);
