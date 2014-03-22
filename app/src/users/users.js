'use strict';

var module = angular.module('consoleApp');

module.config(function config($routeProvider) {
  $routeProvider
    .when('/users',
    {
      templateUrl: '/src/users/users.tpl.html',
      controller: 'UsersCtrl',
      authRequired: true
    })
});

module.controller('UsersCtrl',
  function UsersCtrl(conf, $rootScope, $scope, apiService) {
    $scope.usersSaved = [];
    $scope.currentPage = 0;
    $scope.gap = 3;
    $scope.usersPerPage = 1;
    $scope.total = 3;


    apiService.Users.get(function(res) {
      $scope.users = res.data;
    }, function(err) { $scope.errorShow(err); });


    $scope.getUser = function(form) {
      apiService.UserEmail.get({'email':form.email}, function(res) {
        $scope.usersSaved = $scope.users;
        $scope.users = [];
        $scope.users.push(res.data);
      }, function(err) { $scope.errorShow(err); });
    };


    $scope.clearSearch = function() {
      $scope.users = [];
      $scope.users = $scope.usersSaved;
      $scope.usersSaved = [];
    };


    $scope.toggleAuthorisation = function(id, isAllowed) {
      apiService.User.put({'id':id, 'isAllowed':isAllowed}, function(res) {
        for (var i = 0, l = $scope.users.length; i < l; i++) {
          if ($scope.users[i]._id === id) {
            $scope.users[i].isAllowed = isAllowed;
            break;
          }
        }
      }, function(err) { $scope.errorShow(err); });
    };


    $scope.setPage = function(n) {
      $scope.currentPage = n;
    };


    $scope.prevPage = function() {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }
    };


    $scope.nextPage = function() {
      if ($scope.currentPage < $scope.users.length - 1) {
        $scope.currentPage++;
      }
    };


    $scope.range = function(size, start, end) {
      var ret = [];

      if (size < end) {
        end = size;
        start = size - $scope.gap;
      }

      for (var i = start; i < end; i++) {
        ret.push(i);
      }

      return ret;
    };
  }
);