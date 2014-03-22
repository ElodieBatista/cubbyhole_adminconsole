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
  function LoginCtrl($rootScope, $scope, apiService, $location, $http) {
    $scope.signin = function(form) {
      apiService.Auth.post({'email':form.email, 'pass':form.pass, 'rememberMe':form.rememberMe}, function(res) {
        localStorage.setItem('cubbyhole-consoleApp-token', res.profile.token);
        localStorage.setItem('cubbyhole-consoleApp-profile', JSON.stringify(res.profile));
        $http.defaults.headers.common['X-Cub-AuthToken'] = res.profile.token;
        $rootScope.profile = res.profile;

        $location.path('/users');
      }, function(err) { $scope.errorShow(err); });
    };
  }
);