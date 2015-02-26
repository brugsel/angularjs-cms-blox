'use strict';

angular.module('angularCmsBloxMock').run(function ($httpBackend) {

  $httpBackend.whenGET(/cms.www/).respond(
    function() {
      return [200, mockData.wwwHome, mockData.contentType];
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
