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
      UserEmail.get({'email':email}, function(res) {
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
      User.put({'id':id, 'isAllowed':isAllowed}, function(res) {
        for (var i = 0, l = $scope.users.length; i < l; i++) {
          if ($scope.users[i]._id === id) {
            $scope.users[i].isAllowed = isAllowed;
            break;
          }
        }
      }, function(err) { $scope.errorShow(err); });
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