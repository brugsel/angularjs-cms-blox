'use strict';

describe('Given the cms-text directive', function() {

  beforeEach(module('angularCmsBloxMockTemplates'));

  var loggedIn;

  beforeEach(module('angularCmsBlox', function($provide, $controllerProvider) {
    $controllerProvider.register('cmsTextController', function ($scope) {
      $scope.text = 'Nederlandse text';
      this.isAuthenticated = function() {
        return loggedIn;
      }
    });
  }));

  var _scope;
  var _compile;

  beforeEach(inject(function($rootScope, $compile) {
    _scope = $rootScope.$new();
    _compile = $compile;
  }));

  it('should show a not editable text after init', function () {

    loggedIn = false;
    var element = _compile('<h1 cms-text="home.title"></h1>')(_scope);
    _scope.$digest();

    expect(element.html()).toContain('Nederlandse text');

  });

  it('should show a editable text after init', function () {

    loggedIn = true;
    var element = _compile('<h1 cms-text="home.title"></h1>')(_scope);
    _scope.$digest();

    expect(element.html()).toContain('Nederlandse text');
    expect(element.find('i').hasClass('fa')).toBe(true);

  });

});

//
//describe('Given the cms-text directive controller', function() {
//
//  beforeEach(module('angularCmsBlox'));
//
//
//});
