var mapApp = angular.module('mapApp', ['ngRoute']);

mapApp.config(
  [
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider) 
    {
      $routeProvider.
      when('/', {
        templateUrl: 'partials/index.html',
        controller: 'MemoryController'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'MemoryController'
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
      
  }]);
