'use strict';

var module = angular.module('consoleApp');

/**
 *
 */
module.directive('userExplorer', function() {
  return {
    restrict: 'A',
    scope: '{}',
    template: '',

    link: function (scope, element, attrs) {
      scope.ueOpenModalSearchUser = function() {
        scope.modalOpts = {
          title: 'Search for a user',
          iconClass: 'fa-envelope',
          submitFn: scope.getUser,
          placeholder: 'User email address',
          submitBtnVal: 'Search'
        };

        $('#appmodal').modal('show');
      };
    }
  };
});