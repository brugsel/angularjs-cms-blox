'use strict';

angular.module('angularCmsBloxMock').run(function ($httpBackend) {

  $httpBackend.whenGET(/api\/example\/cms\/www.home.nl_NL/).respond(
    function() {
      return [200, mockData.wwwHome, mockData.contentType];
    });

  $httpBackend.whenGET(/.html$/).passThrough();

});
