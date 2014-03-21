'use strict';

var module = angular.module('consoleApp');

/**
 *
 */
module.directive('planExplorer', function() {
  return {
    restrict: 'A',
    scope: '{}',
    template: '',

    link: function (scope, element, attrs) {
      scope.peOpenModalNewPlan = function() {
        scope.modalform = {};

        scope.modalOpts = {
          title: 'Create a plan',
          submitBtnVal: 'Create',
          submitFn: scope.createPlan,
          template:
            '<div class="modal-body">' +
              '<div class="input-prepend" ng-class="{\'input-prepend-active\': focused0}">' +
                '<i class="fa input-icon fa-th"></i>' +
                '<input class="input-text" type="text" ng-model="modalform.name" placeholder="Name" required ng-init="focused0 = false" ng-focus="focused0 = true" ng-blur="focused0 = false"/>' +
              '</div>' +
              '<div class="input-prepend" ng-class="{\'input-prepend-active\': focused1}">' +
                '<i class="fa input-icon fa-clock-o"></i>' +
                '<input class="input-text" type="number" ng-model="modalform.duration" placeholder="Duration (days)" required ng-init="focused1 = false" ng-focus="focused1 = true" ng-blur="focused1 = false" />' +
              '</div>' +
              '<div class="input-prepend" ng-class="{\'input-prepend-active\': focused2}">' +
                '<i class="fa input-icon fa-cloud"></i>' +
                '<input class="input-text" type="number" ng-model="modalform.storage" placeholder="Storage (Go)" required ng-init="focused2 = false" ng-focus="focused2 = true" ng-blur="focused2 = false" />' +
              '</div>' +
              '<div class="input-prepend" ng-class="{\'input-prepend-active\': focused3}">' +
                '<i class="fa input-icon fa-users"></i>' +
                '<input class="input-text" type="number" ng-model="modalform.sharedQuota" placeholder="Shared Quota (Go)" required ng-init="focused3 = false" ng-focus="focused3 = true" ng-blur="focused3 = false" />' +
              '</div>' +
              '<div class="input-prepend" ng-class="{\'input-prepend-active\': focused4}">' +
                '<i class="fa input-icon fa-arrow-up"></i>' +
                '<input class="input-text" type="number" ng-model="modalform.bandwidth.upload" placeholder="Bandwidth Upload (Mbps)" required ng-init="focused4 = false" ng-focus="focused4 = true" ng-blur="focused4 = false" />' +
              '</div>' +
              '<div class="input-prepend" ng-class="{\'input-prepend-active\': focused5}">' +
                '<i class="fa input-icon fa-arrow-down"></i>' +
                '<input class="input-text" type="number" ng-model="modalform.bandwidth.download" placeholder="Bandwidth Download (Mbps)" required ng-init="focused5 = false" ng-focus="focused5 = true" ng-blur="focused5 = false" />' +
              '</div>' +
              '<div class="input-prepend" ng-class="{\'input-prepend-active\': focused6}">' +
                '<i class="fa input-icon fa-eur"></i>' +
                '<input class="input-text" type="number" step="any" ng-model="modalform.price" placeholder="Price (€)" required ng-init="focused6 = false" ng-focus="focused6 = true" ng-blur="focused6 = false" />' +
              '</div>' +
            '</div>'
        };

        $('#appmodal').modal('show');
      };

      scope.peOpenModalDeleteItem = function(plan) {
        scope.modalOpts = {
          title: 'Delete ' + plan.name + ' plan',
          submitBtnVal: 'Delete',
          submitFn: scope.deletePlan,
          submitFnExtraParam: plan._id,
          template:
            '<div class="modal-body">' +
              '<p>Are you sure you want to delete the ' + plan.name + ' plan?</p>' +
            '</div>'
        };

        $('#appmodal').modal('show');
      };


      scope.peOpenModalEditPlan = function(plan) {
        scope.modalform = {};
        scope.modalform.name = plan.name;
        scope.modalform.duration = plan.duration;
        scope.modalform.storage = plan.storage;
        scope.modalform.sharedQuota = plan.sharedQuota;
        scope.modalform.bandwidth = plan.bandwidth;
        scope.modalform.price = plan.price;

        scope.modalOpts = {
          title: 'Edit ' + plan.name + ' plan',
          submitFn: scope.editPlan,
          submitFnExtraParam: plan._id,
          submitBtnVal: 'Edit',
          template:
            '<div class="modal-body">' +
                '<div class="input-prepend" ng-class="{\'input-prepend-active\': focused0}">' +
                  '<i class="fa input-icon fa-th"></i>' +
                  '<input class="input-text" type="text" ng-model="modalform.name" placeholder="Name" required ng-init="focused0 = false" ng-focus="focused0 = true" ng-blur="focused0 = false"/>' +
                '</div>' +
                '<div class="input-prepend" ng-class="{\'input-prepend-active\': focused1}">' +
                  '<i class="fa input-icon fa-clock-o"></i>' +
                  '<input class="input-text" type="number" ng-model="modalform.duration" placeholder="Duration (days)" required ng-init="focused1 = false" ng-focus="focused1 = true" ng-blur="focused1 = false" />' +
                '</div>' +
                '<div class="input-prepend" ng-class="{\'input-prepend-active\': focused2}">' +
                  '<i class="fa input-icon fa-cloud"></i>' +
                  '<input class="input-text" type="number" ng-model="modalform.storage" placeholder="Storage (Go)" required ng-init="focused2 = false" ng-focus="focused2 = true" ng-blur="focused2 = false" />' +
                '</div>' +
                '<div class="input-prepend" ng-class="{\'input-prepend-active\': focused3}">' +
                  '<i class="fa input-icon fa-users"></i>' +
                  '<input class="input-text" type="number" ng-model="modalform.sharedQuota" placeholder="Shared Quota (Go)" required ng-init="focused3 = false" ng-focus="focused3 = true" ng-blur="focused3 = false" />' +
                '</div>' +
                '<div class="input-prepend" ng-class="{\'input-prepend-active\': focused4}">' +
                  '<i class="fa input-icon fa-arrow-up"></i>' +
                  '<input class="input-text" type="number" ng-model="modalform.bandwidth.upload" placeholder="Bandwidth Upload (Mbps)" required ng-init="focused4 = false" ng-focus="focused4 = true" ng-blur="focused4 = false" />' +
                '</div>' +
                '<div class="input-prepend" ng-class="{\'input-prepend-active\': focused5}">' +
                  '<i class="fa input-icon fa-arrow-down"></i>' +
                  '<input class="input-text" type="number" ng-model="modalform.bandwidth.download" placeholder="Bandwidth Download (Mbps)" required ng-init="focused5 = false" ng-focus="focused5 = true" ng-blur="focused5 = false" />' +
                '</div>' +
                '<div class="input-prepend" ng-class="{\'input-prepend-active\': focused6}">' +
                  '<i class="fa input-icon fa-eur"></i>' +
                  '<input class="input-text" type="number" step="any" ng-model="modalform.price" placeholder="Price (€)" required ng-init="focused6 = false" ng-focus="focused6 = true" ng-blur="focused6 = false" />' +
                '</div>' +
              '</div>'
        };

        $('#appmodal').modal('show');
      };
    }
  };
});