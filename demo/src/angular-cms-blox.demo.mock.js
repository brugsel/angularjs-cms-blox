'use strict';

angular.module('angularCmsBloxMock').run(function ($httpBackend) {

  $httpBackend.whenGET(/cms.www/).respond(
    function() {
      return [200, mockData.wwwHome, mockData.contentType];
    });

  $httpBackend.whenGET(/.html$/).passThrough();

});

