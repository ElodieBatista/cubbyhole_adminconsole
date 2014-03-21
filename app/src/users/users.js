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
  function UsersCtrl(conf, $rootScope, $scope, $resource) {
    // Highlight btn in the nav bar
    $rootScope.navtop = 0;
    $scope.usersSaved = [];
    $scope.currentPage = 0;
    $scope.gap = 3;
    $scope.usersPerPage = 1;
    $scope.total = 3;

    var Users = $resource(conf.epApi + '/user', {}, {
      'get': {
        method: 'GET'
      }
    });

    var UserEmail = $resource(conf.epApi + '/user/:email', {email:'@email'}, {
      'get': {
        method: 'GET'
      }
    });

    var User = $resource(conf.epApi + '/user/:id', {id:'@id'}, {
      'put': {
        method: 'PUT',
        params: {
          isAllowed:'@isAllowed'
        }
      }
    });


    Users.get(function(res) {
      $scope.users = res.data;
    }, function(err) { $scope.errorShow(err); });


    $scope.getUser = function(email) {
      //UserEmail.get({'email':email}, function(res) {
      var res = {
        data: {
          "_id": "53275061dd938e2c1f000002",
          "currentPlan": {
            "plan": {
              "bandwidth": {
                "upload": 100,
                "download": 100
              },
              "name": "Free",
              "price": 0,
              "duration": 30,
              "storage": 100,
              "sharedQuota": 100,
              "_id": "5327503890066f8c1c000005"
            },
            "usage": {
              "bandwidth": {
                "download": 25,
                "upload": 20
              },
              "share": 40,
              "storage": 60
            },
            "active": true,
            "billingDate": "2014-03-17T19:43:29.147Z"
          },
          "email": "elodie555@yopmail.com",
          "verified": true,
          "isAllowed": true,
          "registrationDate": "2014-03-17T19:43:29.140Z"
        }
      };
        $scope.usersSaved = $scope.users;
        $scope.users = [];
        $scope.users.push(res.data);
      //}, function(err) { $scope.errorShow(err); });
    };


    $scope.clearSearch = function() {
      $scope.users = [];
      $scope.users = $scope.usersSaved;
      $scope.usersSaved = [];
    };


    $scope.toggleAuthorisation = function(id, isAllowed) {
      User.put({'id':id, 'isAllowed':isAllowed}, function(res) {
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


    $scope.toggleItem = function(item, forceSelect) {
      if ($scope.itemActive === item && !forceSelect) {
        $scope.itemActive = null;
      } else {
        $scope.itemActive = item;
      }
    };
  }
);