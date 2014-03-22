'use strict';

var module = angular.module('consoleApp');

module.directive('planExplorer', function() {
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

      scope.peOpenModalNewPlan = function() {
        scope.modalform = {};

        scope.modalOpts = {
          title: 'Create a plan',
          submitBtnVal: 'Create',
          submitFn: scope.createPlan,
          templateUrl: 'src/plans/tpls/newPlan.tpl.html'
        };
        $('#appmodal').modal('show');
      };

      scope.peOpenModalDeletePlan = function(plan) {
        scope.modalOpts = {
          title: 'Delete ' + plan.name + ' plan',
          submitBtnVal: 'Delete',
          submitFn: scope.deletePlan,
          submitFnExtraParam: plan._id,
          obj: plan,
          templateUrl: 'src/plans/tpls/deletePlan.tpl.html'
        };
        $('#appmodal').modal('show');
      };


      scope.peOpenModalEditPlan = function(plan) {
        scope.modalform = {
          name: plan.name,
          duration: plan.duration,
          storage: plan.storage,
          sharedQuota: plan.sharedQuota,
          bandwidth: plan.bandwidth,
          price: plan.price
        };

        scope.modalOpts = {
          title: 'Edit ' + plan.name + ' plan',
          submitFn: scope.editPlan,
          submitFnExtraParam: plan._id,
          submitBtnVal: 'Edit',
          templateUrl: 'src/plans/tpls/editPlan.tpl.html'
        };
        $('#appmodal').modal('show');
      };
    }
  };
});