'use strict';

var module = angular.module('consoleApp');

module.config(function config($routeProvider) {
  $routeProvider
    .when('/plans',
    {
      templateUrl: '/src/plans/plans.tpl.html',
      controller: 'PlansCtrl',
      authRequired: true
    })
});

module.controller('PlansCtrl',
  function PlansCtrl($scope, apiService) {
    apiService.Plans.get(function(res) {
      $scope.plans = res.data;
    }, function(err) { $scope.errorShow(err); });


    apiService.Bandwidths.get(function(res) {
      $scope.bandwidths = res.data;
    }, function(err) { $scope.errorShow(err); });


    $scope.createPlan = function(plan) {
      plan.bandwidth = plan.bandwidth._id;
      apiService.Plans.post({'plan':plan}, function(res) {
        $scope.plans.push(res.data);
      }, function(err) { $scope.errorShow(err); });
    };


    $scope.editPlan = function(plan, id) {
      plan.bandwidth = plan.bandwidth._id;
      apiService.Plan.put({'id':id, 'plan':plan}, function(res) {
        for (var i = 0, l = $scope.plans.length; i < l; i++) {
          if ($scope.plans[i]._id === id) {
            $scope.plans[i] = res.data;
            $scope.toggleItem($scope.plans[i], true);
            break;
          }
        }
      }, function(err) { $scope.errorShow(err); });
    };


    $scope.deletePlan = function(form, id) {
      apiService.Plan.delete({'id':id}, function(res) {
        for (var i = 0, l = $scope.plans.length; i < l; i++) {
          if ($scope.plans[i]._id === id) {
            $scope.plans.splice(i, 1);
            $scope.toggleItem(null);
            break;
          }
        }
      }, function(err) { $scope.errorShow(err); });
    };
  }
);