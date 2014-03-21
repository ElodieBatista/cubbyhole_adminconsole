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
          submitBtnVal: 'Search',
          template:
            '<div class="modal-body">' +
              '<div class="input-prepend" ng-class="{\'input-prepend-active\': focused0}">' +
                '<i class="fa input-icon" ng-class="modalOpts.iconClass"></i>' +
                '<input class="input-text" type="email" placeholder="{{modalOpts.placeholder}}" required ng-init="focused0 = false" ng-focus="focused0 = true" ng-blur="focused0 = false"/>' +
              '</div>' +
            '</div>'
        };

        $('#appmodal').modal('show');
      };
    }
  };
});