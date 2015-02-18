'use strict';

angular.module('angularCmsBlox')
  .factory('Loginservice', ['$http', '$location', '$q', 'Authservice', 'ACCESS_LEVELS', function ($http, $location, $q, Authservice, ACCESS_LEVELS) {

    var login = function (username, password) {

      var deferred = $q.defer();

      var url = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/oauth/token';

      var xsrf = {
        grant_type: 'password',
        username: username,
        password: password
      };

      $http({
        method: 'POST',
        url: url,
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
          }
          return str.join('&');
        },
        data: xsrf,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).success(function (data) {

        var user = {
          role: ACCESS_LEVELS.user, //TODO lvb, rollen in backend overnermen.
          username: username,
          token: data.access_token
        };

        Authservice.setUser(user);

        deferred.resolve(data);

      }).catch(function (reason) {
        deferred.reject(reason);
      });

      return deferred.promise;

    };

    var logoff = function() {
      Authservice.logoff();
    };

    return {
      login: login,
      logoff: logoff
    };

  }]);
