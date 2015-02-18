'use strict';

angular.module('angularCmsBlox')
  .factory('Authservice', ['$cookieStore', 'ACCESS_LEVELS' ,function ($cookieStore, ACCESS_LEVELS) {

    var _user = $cookieStore.get('user');
    var _path;

    var isAuthorized = function (lvl) {
      if (_user) {
        return _user.role >= lvl;
      } else {
        return false;
      }
    };

    var setUser = function(user) {
      if (!user.role || user.role < 0) {
        user.role = ACCESS_LEVELS.pub;
      }
      _user = user;
      $cookieStore.put('user', _user);
    };

    return {
      isAuthorized: isAuthorized,
      isLoggedIn: function () {
        return _user ? true : false;
      },
      setUser: setUser,
      getUser: function () {
        return _user;
      },
      getToken: function () {
        return _user ? _user.token : '';
      },
      setToken: function (token) {
        if (_user) {
          _user.token=token;
        }
      },
      logout: function () {
        $cookieStore.remove('user');
        _user = null;
      },
      getPath: function() {
        return _path;
      },
      setPath: function(path) {
        _path = path;
      }
    };

  }]);
