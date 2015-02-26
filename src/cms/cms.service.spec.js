'use strict';

describe('Given the CMS service ', function () {

  var _httpBackend;
  var _service;

  beforeEach(module('angularCmsBlox'));

  beforeEach(module(function($provide) {
    $provide.factory('cmsConfig', function() {
      return {
        url: '/cms'
      };
    });
  }));

  beforeEach(inject(function ($httpBackend, cmsService) {

    _httpBackend = $httpBackend;
    _service = cmsService;

  }));

  it('should return translations of a part of a site', function() {

    _httpBackend.whenGET(/cms/).respond(
      function() {
        return [200,
          {
            'home': {
              'title': 'Title!'
            }
          }
          , "{'Content-type': 'application/json'}"];
      });

    _service.getPageText('home', 'nl_NL').then(function(translations) {
      expect(translations.home.title).toBe('Title!');
    });

    _httpBackend.flush();

  });

});
