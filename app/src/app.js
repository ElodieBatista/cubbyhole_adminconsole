'use strict';

angular.module('consoleApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngAnimate'
  ])
  .constant('conf', {
    'epApi': 'http://localhost:3000',
    'epDbdApi': 'http://localhost:3001',
    'epWeb': 'http://localhost:8000'
  })
  .config(function(conf, $locationProvider, $httpProvider, $routeProvider, $sceDelegateProvider, $provide) {
    $httpProvider.defaults.headers.common['X-Cub-AuthToken'] = localStorage.getItem('cubbyhole-consoleApp-token');
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';

    function comesFromCubbyhole(url) {
      return (url.indexOf(conf.epApi) !== -1);
    }

    $provide.factory('httpInterceptor', function($q, $rootScope, $location) {
      return {
        'request': function(config) {
          if (comesFromCubbyhole(config.url)) {
            $rootScope.displaySpinner = true;
          }
          return config || $q.when(config);
        },

        'response': function(response) {
          if (response.config.url.indexOf(conf.epApi) !== -1) {
            $rootScope.displaySpinner = false;
          }
          return response || $q.when(response);
        },

        'responseError': function (response) {
          if (comesFromCubbyhole(response.config.url)) {
            $rootScope.displaySpinner = false;

            if (response.status === 401) {
              console.log('401 detected from the server, exiting local session.');
              $location.path('/logout');
            }
          }
          return $q.reject(response);
        }
      };
    });

    $httpProvider.interceptors.push('httpInterceptor');

    $routeProvider.otherwise({redirectTo: '/users'});

    $sceDelegateProvider.resourceUrlWhitelist([conf.epApi + '**', 'self'])
  })
  .run(function(conf, $rootScope, $location) {
    $rootScope.conf = conf;

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (next.authRequired === true && !$rootScope.getToken()) {
        $location.$$search = {};
        delete $location.$$search.page;
        $location.path('/login');
      }
    });

    $rootScope.getToken = function() {
      if ($rootScope.token) {
        return $rootScope.token;
      } else if (localStorage.getItem('cubbyhole-consoleApp-token')) {
        $rootScope.token = localStorage.getItem('cubbyhole-consoleApp-token');
        return $rootScope.token;
      } else {
        return null;
      }
    };

    $rootScope.getProfile = function() {
      if ($rootScope.profile) {
        return $rootScope.profile;
      } else if (localStorage.getItem('cubbyhole-consoleApp-profile')) {
        $rootScope.profile = JSON.parse(localStorage.getItem('cubbyhole-consoleApp-profile'));
        return $rootScope.profile;
      } else {
        return null;
      }
    };
  });