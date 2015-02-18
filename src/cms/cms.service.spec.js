'use strict';

describe('Given the CMS service ', function () {

  var _httpBackend;
  var _service;

  beforeEach(module('angularCmsBlox'));

  beforeEach(inject(function ($httpBackend, cmsService) {

    _httpBackend = $httpBackend;
    _service = cmsService;

  }));

  it('should return translations of a part of a site', function() {

    _httpBackend.whenGET('/api/example/cms?f=%7B%22text%22:1%7D&q=%7B%22site%22:%22www%22,%22page%22:%22home%22%7D').respond(200, mockData.wwwArray, mockData.contentType);

    _service.getPageText('www', 'home').then(function(translations) {
      expect(translations[0].home.title).toBe('Mooie titel in het Nederlands!');
    });

    _httpBackend.flush();

  });

 it('should return a http 404 when site is not found', function() {

    _httpBackend.whenGET('/api/example/cms?f=%7B%22text%22:1%7D&q=%7B%22site%22:%22unknown%22,%22page%22:%22home%22%7D').respond(404, [], mockData.contentType);

    _service.getPageText('unknown', 'home').then(function() {}, function(status) {
      expect(status).toBe(404);
    });

    _httpBackend.flush();

  });

});
