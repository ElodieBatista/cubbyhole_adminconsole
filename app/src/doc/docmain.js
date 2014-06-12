'use strict';

var module = angular.module('consoleApp');

module.config(function config($routeProvider) {
  $routeProvider
    .when('/docmain',
    {
      templateUrl: '/src/doc/doc.tpl.html',
      controller: 'DocMainCtrl',
      reloadOnSearch: false,
      authRequired: true
    })
});

module.controller('DocMainCtrl',
  function DocMainCtrl(conf, $scope, apiService) {
    apiService.DocumentationMain.get(function(res) {
      $scope.endpoints = res.data;
    });
  }
);