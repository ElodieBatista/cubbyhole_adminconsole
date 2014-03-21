'use strict';

var module = angular.module('consoleApp');

/**
 * Displays a modal with an error msg corresponding to the route and the status
 */
module.directive('error', function() {
  return {
    restrict: 'A',

    link: function (scope, element, attrs) {
      var errors = {
        custom: {
          0: 'Impossible to upload these items: '
        },
        500: 'Something went wrong. Please, try again later.',
        auth: {
          POST: {
            404: 'Incorrect email or password.'
          }
        },
        user: {
          GET: {
            404: 'This user doesn\'t exist.'
          }
        },
        plan: {
          GET: {
            404: 'This plan doesn\'t exist.'
          }
        }
      };


      scope.errorShow = function(error) {
        $('#appmodal').modal('hide');

        var errorText = '';

        if (error.custom !== undefined) {
          errorText = errors.custom[error.custom] + error.param;
        } else {
          console.log(error.config.url + ' ' + error.status);

          error.config.url = error.config.url.replace('//', '');

          var route;

          if (error.status !== 500) {
            var pos1 = error.config.url.indexOf('/');
            var pos2 = error.config.url.indexOf('/', pos1 + 1);

            if (pos2 === -1) {
              route = error.config.url.substring(pos1 + 1);
            } else {
              route = error.config.url.substring(pos1 + 1, pos2);
            }
            errorText = errors[route][error.config.method][error.status];
          } else {
            errorText = errors['500'];
          }
        }


        scope.modalOpts = {
          title: 'Error',
          submitBtnVal: 'Ok',
          template:
            '<div class="modal-body">' +
              '<p>' + errorText + '</p>' +
            '</div>'
        };

        $('#errormodal #appmodal').modal('show');
      };
    }
  };
});