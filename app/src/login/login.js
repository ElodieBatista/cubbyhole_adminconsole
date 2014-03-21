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
  function LoginCtrl($rootScope, $scope, $location, $http) {
    $scope.signin = function(form) {

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