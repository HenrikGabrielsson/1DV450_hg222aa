var mapApp = angular.module("mapApp", ["ngRoute", "ngMap"]);

mapApp.config(
  [
  '$routeProvider',
  '$locationProvider',
  '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider) 
    {
      $routeProvider.
      when('/', {
        templateUrl: 'partials/index_partial.html',
        controller: 'MemoryController',
        controllerAs: "memory"
      })
      .when('/user/:id', {
        templateUrl: 'partials/user.html',
        controller: 'UserController',
        controllerAs: "user"
      })
      .when('/memory/:id', {
        templateUrl: "partials/memory.html",
        controller: "MemoryController.html",
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
