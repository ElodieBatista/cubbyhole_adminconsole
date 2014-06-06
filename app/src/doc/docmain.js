'use strict';

var module = angular.module('consoleApp');

module.config(function config($routeProvider) {
  $routeProvider
    .when('/docmain',
    {
      templateUrl: '/src/doc/doc.tpl.html',
      controller: 'DocMainCtrl',
      reloadOnSearch: false,
      authRequired: true
    })
});

module.controller('DocMainCtrl',
  function DocMainCtrl(conf, $scope, apiService) {
    var res = {
      "endpoints": [
        {
          "name": "/item",
          "methods": [
            {
              "MethodName": "Get all items",
              "Synopsis": "Returns all authenticated user item",
              "HTTPMethod": "GET",
              "URI": "/item",
              "RequiresOAuth": "Y"
            },
            {
              "MethodName": "Add item",
              "Synopsis": "Uploads files or creates a folder in the authenticated user",
              "HTTPMethod": "POST",
              "URI": "/item",
              "RequiresOAuth": "Y",
              "parameters": [
                {
                  "Name": "parent",
                  "Description": "ID of the parent",
                  "Required": "Y",
                  "Type": "ObjectId"
                },
                {
                  "Name": "name",
                  "Description": "Name of the folder\nRequired only for folders",
                  "Type": "string"
                },
                {
                  "Name": "files",
                  "Description": "File(s) to upload",
                  "Required": "N",
                  "Type": "-F"
                }
              ]
            },
            {
              "MethodName": "Duplicate item",
              "Synopsis": "Duplicates the given item in the given parent",
              "HTTPMethod": "POST",
              "URI": "/item/{id}",
              "RequiresOAuth": "Y",
              "parameters": [
                {
                  "Name": "id",
                  "Description": "ID of item to duplicate",
                  "Required": "Y",
                  "Type": "ObjectId"
                },
                {
                  "Name": "parent",
                  "Description": "ID of parent",
                  "Required": "Y",
                  "Type": "ObjectId"
                }
              ]
            },
            {
              "MethodName": "Get item",
              "Synopsis": "Returns a pet based on id",
              "HTTPMethod": "GET",
              "URI": "/item/{id}",
              "RequiresOAuth": "Y",
              "parameters": [
                {
                  "Name": "id",
                  "Description": "ID of the item to return",
                  "Required": "Y",
                  "Type": "ObjectId"
                }
              ]
            },
            {
              "MethodName": "Download item",
              "Synopsis": "Downloads an item based on id",
              "HTTPMethod": "GET",
              "URI": "/item/{id}/download",
              "RequiresOAuth": "N",
              "parameters": [
                {
                  "Name": "id",
                  "Description": "ID of the item to download",
                  "Required": "Y",
                  "Type": "ObjectId"
                },
                {
                  "Name": "token",
                  "Description": "Authentication token, not needed for public items",
                  "Required": "N",
                  "Type": "X-Cub-AuthToken"
                }
              ]
            },
            {
              "MethodName": "Delete item",
              "Synopsis": "Deletes an item based on id",
              "HTTPMethod": "DELETE",
              "URI": "/item/{id}",
              "RequiresOAuth": "Y",
              "parameters": [
                {
                  "Name": "id",
                  "Description": "ID of the item to delete",
                  "Required": "Y",
                  "Type": "ObjectId"
                }
              ]
            },
            {
              "MethodName": "Update item",
              "Synopsis": "Updates item's parent or name based on given parameter",
              "HTTPMethod": "PUT",
              "URI": "/item/{id}",
              "RequiresOAuth": "Y",
              "parameters": [
                {
                  "Name": "id",
                  "Description": "ID of the item to update",
                  "Required": "Y",
                  "Type": "ObjectId"
                },
                {
                  "Name": "name",
                  "Description": "New item's name",
                  "Required": "N",
                  "Type": "string"
                },
                {
                  "Name": "parent",
                  "Description": "New item's parent",
                  "Required": "N",
                  "Type": "ObjectId"
                }
              ]
            }
          ]
        }
      ]
    };

    $scope.endpoints = res.endpoints;
  }
);