'use strict';

angular.module('angularCmsBloxMock').run(function ($httpBackend) {

  $httpBackend.whenPOST(/oauth\/token/).respond(
    function() {
      return [200, {
        access_token: 'xKq2yTSAzj9bo7avtRSpOYhfnaexpeHeo/t52JF8mdQ=',
        expires_in: 3600,
        refresh_token: '0bmaRURD1K+HsTialb9vg+wH72NOfindg0SkoaqtjTE=',
        token_type: 'Bearer'
      }, {'Content-type': 'application/json'}];
    }
  );

  $httpBackend.whenGET(/.html$/).passThrough();

});

