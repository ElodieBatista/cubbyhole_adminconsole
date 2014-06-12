'use strict';

var module = angular.module('consoleApp');

module.config(function config($routeProvider) {
  $routeProvider
    .when('/docdashboard',
    {
      templateUrl: '/src/doc/doc.tpl.html',
      controller: 'DocDashboardCtrl',
      reloadOnSearch: false,
      authRequired: true
    })
});

module.controller('DocDashboardCtrl',
  function DocDashboardCtrl(conf, $scope, apiService) {
    apiService.DocumentationDashboard.get(function(res) {
      $scope.endpoints = res.data;
    });
  }
);