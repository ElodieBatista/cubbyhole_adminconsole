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
    if ($routeParams.page === undefined) {
      $location.search({page: 1});
      $route.reload();
    }

    $scope.page = parseInt($routeParams.page);

    $scope.limit = 5;
    $scope.start = $scope.limit * ($scope.page - 1);
    $scope.hasMore = true;

    $scope.usersSaved = [];
    $scope.gap = 3;
    $scope.total = 0;
    $scope.pages = [];


    $scope.update = function(res) {
      $scope.users = res.data;
      $scope.hasMore = res.hasMore;
      $scope.total = res.total;
      $scope.pages = $scope.getPaginationNbs($scope.page);
    };


    apiService.Users.get({start:$scope.start, limit:$scope.limit}, function(res) {
      $scope.update(res);
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


    $scope.deleteUser = function(form, id) {
      apiService.User.delete({'id':id}, function(res) {
        for (var i = 0, l = $scope.users.length; i < l; i++) {
          if ($scope.users[i]._id === id) {
            $scope.users.splice(i, 1);
            $scope.toggleItem(null);
            break;
          }
        }
      }, function(err) { $scope.errorShow(err); });
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
      apiService.Users.get({start:$scope.limit * (n - 1), limit:$scope.limit}, function(res) {
        $scope.page = n;
        $scope.start = $scope.limit * ($scope.page - 1);
        $scope.update(res);
        $location.search({page: n});
      }, function(err) { $scope.errorShow(err); });
    };


    $scope.prevPage = function() {
      if ($scope.start > 0) {
        apiService.Users.get({start:$scope.start - $scope.limit, limit:$scope.limit}, function(res) {
          $scope.start -= $scope.limit;
          $location.search({page: --$scope.page});
          $scope.update(res);
        }, function(err) { $scope.errorShow(err); });
      }
    };


    $scope.nextPage = function() {
      if ($scope.hasMore) {
        apiService.Users.get({start:$scope.start + $scope.limit, limit:$scope.limit}, function(res) {
          $scope.start += $scope.limit;
          $location.search({page: ++$scope.page});
          $scope.update(res);
        }, function(err) { $scope.errorShow(err); });
      }
    };


    $scope.getNbOfPages = function() {
      var nbOfPages = Math.ceil($scope.total / $scope.limit);

      if ($scope.gap > nbOfPages) {
        $scope.gap = nbOfPages;
      }

      return nbOfPages;
    };

    $scope.getPaginationNbs = function(pageNb) {
      var nbOfPages = $scope.getNbOfPages(),
          nbs = [],
          even = ($scope.gap % 2 === 0),
          middle = Math.ceil($scope.gap / 2) - 1,
          start = -middle,
          end = (even ? middle + 1 : middle);

      for (var i = start; i <= end; i++) {
        nbs.push(pageNb + i);
      }

      var diffStart = 1 - nbs[0];
      for (var j = 0; j < diffStart; j++) {
        var first = nbs.shift();
        first += $scope.gap;
        nbs.push(first);
      }

      var diffEnd = nbs[$scope.gap - 1] - nbOfPages;
      for (var k = 0; k < diffEnd; k++) {
        var last = nbs.pop();
        last -= $scope.gap;
        nbs.unshift(last);
      }

      return nbs;
    };
  }
);