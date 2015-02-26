'use strict';

/**
 * @ngdoc provider
 * @name www.provider:config
 * @description
 * # config
 */
angular.module('angularCmsBlox').provider('cmsConfig', ['$translateProvider','$translatePartialLoaderProvider', function ($translateProvider, $translatePartialLoaderProvider) {

  this.setPreferredLanguage = function(language) {
    this.preferredLanguage = language || 'nl_NL';
    $translateProvider.preferredLanguage(this.preferredLanguage);
  };

  this.setUrl = function(url) {
    this.url = url || '/api/example/cms';
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: this.url+ '/{part}.{lang}'
    });
    $translatePartialLoaderProvider.addPart('home');
  };

  this.$get = function () {
    return this;
  };

}]);
