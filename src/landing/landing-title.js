'use strict';

/**
 * @ngdoc directive
 * @name www.directive:landingTitle
 * @description
 * # landingTitle
 */
angular.module('angularCmsBlox')

  .directive('cmsLandingTitle', [function () {

    return {
      restrict: 'EA',
      replace: false,
      scope: {
        text: '@',
        duration: '@'
      },
      templateUrl: 'landing/landing-title.template.html',
      controller: 'landingTitleController',
      controllerAs: 'ctrl',
      bindToController: true
    };

  }])

  .controller('landingTitleController', ['$log', '$timeout', 'authService',function($log, $timeout, authService) {

    var texts = this.text.split(' ');
    var duration = this.duration || 3000;

    var next = function() {
      $timeout(function () {
        settings.next = settings.index+1;
        settings.index = undefined;
        $timeout(function () {
          settings.index = settings.next;
          if (settings.index > settings.texts.length) {
            settings.index = 0;
          }
          next();
        }, 1000);
      }, duration);
    };

    var settings = {
      index: undefined,
      texts: []
    };
    this.settings = settings;

    this.startLoop = function() {
      settings.texts = texts;
      $timeout(function () {
        settings.index = 0;
        next();
      }, 250);
    };

    this.isAuthenticated = function() {
      return authService.isAuthenticated();
    };

  }]);
