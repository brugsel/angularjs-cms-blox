'use strict';

angular.module('angularCmsBloxMock').run(function ($httpBackend) {

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

  $httpBackend.whenPOST(/auth\/google/).respond(
    function() {
      return [200,
        {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NGU4NWI5OWE5YjIxZWJiNGQ5ZDM0MWUiLCJpYXQiOjE0MjQ1MTUyODYsImV4cCI6MTQyNTcyNDg4Nn0.QxXaaZHy7PkYv3PS3mqNIzkqDAvlyBK1Bs297n7AVvA"}
        , "{'Content-type': 'application/json'}"];
    });

  $httpBackend.whenPOST(/auth/).passThrough();

});
