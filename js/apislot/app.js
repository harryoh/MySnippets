var app = angular.module('plunker', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view.html',
    controller: 'MainCtrl',
    resolve: {
      'DefaultData': function(Storage) {
        return Storage.promise.then(
          function(response) {
            return response.data;
          },
          function(reason) {
            return false;
          });
      }
    }
  }).when('/link1', {
    templateUrl: 'view.html',
    controller: 'OnvifCtrl',
    resolve: {
      'DefaultData': function(Storage) {
        return Storage.promise.then(
          function(response) {
            return response.data;
          },
          function(reason) {
            return false;
          });
      }
    }
  }).when('/link2', {
    templateUrl: 'view.html',
    controller: 'UapiCtrl',
    resolve: {
      'DefaultData': function(Storage) {
        return Storage.promise.then(
          function(response) {
            return response.data;
          },
          function(reason) {
            return false;
          });
      }
    }
  });
});