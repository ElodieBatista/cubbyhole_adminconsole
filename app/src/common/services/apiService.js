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
    AuthError: {
      POST: {
        401: 'Please, check your emails to verify your address.',
        403: 'Your account has been deactivated by our administrator. For more information, please send an email to cubbyhole.contact@gmail.com.',
        404: 'Incorrect email or password.',
        422: 'This email address already exists. Please, try another one.'
      }
    },

    DocumentationMain: $resource(conf.epApi + '/documentation', {}, {
      'get': {
        method: 'GET'
      }
    }),
    DocumentationDashboard: $resource(conf.epDbdApi + '/documentation', {}, {
      'get': {
        method: 'GET'
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
    PlanError: {
      GET: {
        404: 'This plan doesn\'t exist.'
      },
      DELETE: {
        403: 'This plan can\'t be deleted.',
        404: 'This plan doesn\'t exist.'
      }
    },


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
    }),
    UserError: {
      GET: {
        404: 'This user doesn\'t exist.'
      },
      PUT: {
        404: 'This user doesn\'t exist.'
      }
    }
  };
});