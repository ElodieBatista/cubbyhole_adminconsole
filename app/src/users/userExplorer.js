'use strict';

var module = angular.module('consoleApp');

module.directive('userExplorer', function() {
  return {
    restrict: 'A',
    scope: '{}',

    link: function (scope, element, attrs) {
      scope.toggleItem = function(item, forceSelect) {
        if (scope.itemActive === item && !forceSelect) {
          scope.itemActive = null;
        } else {
          scope.itemActive = item;
        }
      };


      scope.ueOpenModalSearchUser = function() {
        scope.modalOpts = {
          title: 'Search for a user',
          submitFn: scope.getUser,
          submitBtnVal: 'Search',
          templateUrl: 'src/users/tpls/searchUser.tpl.html'
        };
        $('#appmodal').modal('show');
      };


      scope.ueOpenModalDeleteUser = function(user) {
        scope.modalOpts = {
          title: 'Delete ' + user.email + ' user',
          submitBtnVal: 'Delete',
          submitFn: scope.deleteUser,
          submitFnExtraParam: user._id,
          obj: user,
          templateUrl: 'src/users/tpls/deleteUser.tpl.html'
        };
        $('#appmodal').modal('show');
      }
    }
  };
});