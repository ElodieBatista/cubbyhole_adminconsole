'use strict';

var module = angular.module('consoleApp');

module.factory('apiService', function(conf, $resource) {
  return {
    Auth: $resource(conf.epApi + '/auth/signin', {}, {
      'post': {
        method:'POST',
        params: {
          email: '@email',
          pass: '@pass',
          rememberMe: '@rememberMe'
        }
      }
    }),


    Plans: $resource(conf.epApi + '/plan', {}, {
      'get': {
        method: 'GET'
      },
      'post': {
        method: 'POST',
        params: {
          plan:'@plan'
        }
      }
    }),

    Plan: $resource(conf.epApi + '/plan/:id', {id:'@id'}, {
      'put': {
        method: 'PUT',
        params: {
          plan:'@plan'
        }
      },
      'delete': {
        method: 'DELETE'
      }
    }),


    Bandwidths: $resource(conf.epApi + '/bandwidth', {}, {
      'get': {
        method: 'GET'
      }
    }),

    Users: $resource(conf.epApi + '/user/:start/:limit', {start:'@start', limit:'@limit'}, {
      'get': {
        method: 'GET'
      }
    }),

    UserEmail: $resource(conf.epApi + '/user/email/:email', {email:'@email'}, {
      'get': {
        method: 'GET'
      }
    }),

    User: $resource(conf.epApi + '/user/:id', {id:'@id'}, {
      'put': {
        method: 'PUT',
        params: {
          isAllowed:'@isAllowed'
        }
      },
      'delete': {
        method: 'DELETE'
      }
    })
  };
});