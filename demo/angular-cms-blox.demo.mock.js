'use strict';

angular.module('angularCmsBloxMock').run(function ($httpBackend) {

  $httpBackend.whenGET(/cms_www\/home.nl_NL/).respond(
    function() {
      return [200, mockData.wwwHome, mockData.contentType];
    });

  $httpBackend.whenGET(/cms_www\/auth.nl_NL/).respond(
    function() {
      return [200, mockData.wwwAuth, mockData.contentType];
    });

  $httpBackend.whenPOST(/api\/sandbox\/doon\/catalog\/cms_www/).respond(
    function() {
      return [200, mockData.wwwAuth, mockData.contentType];
    });

  $httpBackend.whenPOST(/auth\/signup/).respond(
    function() {
      return [200, {}, mockData.contentType];
    });

  $httpBackend.whenPOST(/auth\/login/).respond(
    function() {
      return [200, mockData.token, mockData.contentType];
    });

  $httpBackend.whenPOST(/auth\/google/).respond(
    function() {
      return [200, mockData.token, mockData.contentType];
    });

  $httpBackend.whenGET(/auth\/me/).respond(
    function() {
      return [200,
        {
          displayName: "",
          email: "",
          role: 2
        }
        , "{'Content-type': 'application/json'}"];
    });

  $httpBackend.whenGET(/.html$/).passThrough();

});
