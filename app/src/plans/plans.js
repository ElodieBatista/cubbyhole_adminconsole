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
  function PlansCtrl(conf, $rootScope, $scope, $resource) {
    // Highlight btn in the nav bar
    $rootScope.navtop = 1;

    var Plans = $resource(conf.epApi + '/plan', {}, {
      'get': {
        method: 'GET'
      },
      'post': {
        method: 'POST',
        params: {
          plan:'@plan'
        }
      }
    });

    var Plan = $resource(conf.epApi + '/plan/:id', {id:'@id'}, {
      'put': {
        method: 'PUT',
        params: {
          plan:'@plan'
        }
      },
      'delete': {
        method: 'DELETE'
      }
    });


    Plans.get(function(res) {
      $scope.plans = res.data;
    }, function(err) { $scope.errorShow(err); });


    $scope.createPlan = function(plan) {
      //Plans.post({'plan':plan}, function(res) {
        //$scope.plans.push(res.data);

        //TEMP
        plan._id = Date.now();
        $scope.plans.push(plan);
      //}, function(err) { $scope.errorShow(err); });
    };


    $scope.editPlan = function(plan, id) {
      //Plan.put({'id':plan._id, 'plan':plan}, function(res) {
        for (var i = 0, l = $scope.plans.length; i < l; i++) {
          if ($scope.plans[i]._id === id) {
            $scope.plans[i].name = plan.name;
            $scope.plans[i].duration = plan.duration;
            $scope.plans[i].storage = plan.storage;
            $scope.plans[i].sharedQuota = plan.sharedQuota;
            $scope.plans[i].bandwidth = plan.bandwidth;
            $scope.plans[i].price = plan.price;
            break;
          }
        }
      //}, function(err) { $scope.errorShow(err); });
    };


    $scope.deletePlan = function(form, id) {
      //Plan.delete({'id':id}, function(res) {
      for (var i = 0, l = $scope.plans.length; i < l; i++) {
        if ($scope.plans[i]._id === id) {
          $scope.plans.splice(i, 1);
          break;
        }
      }
      //}, function(err) { $scope.errorShow(err); });
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