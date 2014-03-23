'use strict';

var module = angular.module('consoleApp');

module.config(function config($routeProvider) {
  $routeProvider
    .when('/users',
    {
      templateUrl: '/src/users/users.tpl.html',
      controller: 'UsersCtrl',
      reloadOnSearch: false,
      authRequired: true
    })
});

module.controller('UsersCtrl',
  function UsersCtrl(conf, $rootScope, $scope, $routeParams, $location, $route, apiService) {
    $scope.page = $routeParams.page;

    $scope.start = 0;
    $scope.limit = 5;
    $scope.hasMore = true;

    if ($scope.page !== undefined) {
      $scope.start = $scope.limit * ($scope.page - 1);
    }


    $scope.usersSaved = [];
    $scope.currentPage = 0;
    $scope.gap = 3;
    $scope.total = 3;


    apiService.Users.get({start:$scope.start, limit:$scope.limit}, function(res) {
      $scope.users = res.data;
      $scope.hasMore = res.hasMore;

      if ($scope.users.length === 0 && $scope.page > 1) {
        $location.search({page: 1});
        $route.reload();
      }
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
      if ($scope.start > 0) {
        $scope.start -= $scope.limit;
        apiService.Users.get({start:$scope.start, limit:$scope.limit}, function(res) {
          $scope.users = res.data;
          $scope.hasMore = res.hasMore;
          $location.search({page: --$scope.page});
        }, function(err) { $scope.errorShow(err); });
      }

      /*if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }*/
    };


    $scope.nextPage = function() {
      if ($scope.hasMore) {
        $scope.start += $scope.limit;
        apiService.Users.get({start:$scope.start, limit:$scope.limit}, function(res) {
          $scope.users = res.data;
          $scope.hasMore = res.hasMore;
          $location.search({page: ++$scope.page});
        }, function(err) { $scope.errorShow(err); });
      }


      /*if ($scope.currentPage < $scope.users.length - 1) {
        $scope.currentPage++;
      }*/
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