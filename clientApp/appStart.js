var mapApp = angular.module('mapApp', ['ngRoute']);

mapApp.config(
  [
  '$routeProvider',
  '$locationProvider',
  '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider) 
    {
      $routeProvider.
      when('/', {
        templateUrl: 'partials/login.html',
        controller: 'MemoryController',
        controllerAs: "memory"
      })
      .when('/user/:id', {
        templateUrl: 'partials/user.html',
        controller: 'MemoryController',
        controllerAs: "memory"
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'MemoryController',
        controllerAs: "memory"
      })
      .otherwise({
        redirectTo: '/'
      });
      
      $locationProvider.html5Mode(true);
    
      var apiKey = "kr7iOpDpMmEojVIMHdAYQPghA4SeM3QDZw";

      //always send apiKey by default (GET,POST,PUT,DELETE)
      $httpProvider.defaults.headers.common = { 'apikey' : apiKey };
  }]);
