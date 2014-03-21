'use strict';

var module = angular.module('consoleApp');

module.config(function config($routeProvider) {
  $routeProvider
    .when('/login',
    {
      templateUrl: '/src/login/login.tpl.html',
      controller: 'LoginCtrl'
    })
});

module.controller('LoginCtrl',
  function LoginCtrl(conf, $rootScope, $scope, $resource, $location, $http) {
    var Auth = $resource(conf.epApi + '/auth/signin', {}, {
      'post': {
        method:'POST',
        params: {
          email: '@email',
          pass: '@pass',
          rememberMe: '@rememberMe'
        }
      }
    });

    $scope.signin = function(form) {
      Auth.post({'email':form.email, 'pass':form.pass, 'rememberMe':form.rememberMe}, function(res) {
        localStorage.setItem('cubbyhole-consoleApp-token', res.profile.token);
        localStorage.setItem('cubbyhole-consoleApp-profile', JSON.stringify(res.profile));
        $http.defaults.headers.common['X-Cub-AuthToken'] = res.profile.token;
        $rootScope.profile = res.profile;

        $location.path('/users');
      }, function(err) { $scope.errorShow(err); });
    };

    /*var profile = JSON.parse(localStorage.getItem('dataAuth'));

    localStorage.removeItem('dataAuth');
    localStorage.setItem('token', profile.token);
    localStorage.setItem('profile', JSON.stringify(profile));
    $http.defaults.headers.common['X-Cub-AuthToken'] = profile.token;
    $rootScope.profile = profile;

    $location.path('/users');*/
  }
);