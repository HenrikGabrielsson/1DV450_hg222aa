var mapApp = angular.module("mapApp", ["ngRoute", "ngMap"]);

mapApp.config(
  [
  '$routeProvider',
  '$locationProvider',
  '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider) 
    {
      $routeProvider
      .when('/', {
        templateUrl: 'partials/index_partial.html',
        controller: 'MemoryController',
        controllerAs: "memory"
      })
      .when('/user/:id/edit', {
        templateUrl: "partials/user_edit.html",
        controller: "UserController",
        controllerAs: "user"
      })
      .when('/user/:id', {
        templateUrl: 'partials/user.html',
        controller: 'UserController',
        controllerAs: "user"
      })
      .when('/memory/:id', {
        templateUrl: "partials/memory.html",
        controller: "MemoryController",
        controllerAs: "memory"
      })
      .when('/tag/:id', {
        templateUrl: "partials/tag.html",
        controller: "TagController",
        controllerAs: "tag"
      })
      .otherwise({
        redirectTo: '/'
      });
      
      $locationProvider.html5Mode(true);
    
      var apiKey = "6up-EkZyhWovOPjMNxm_3whVOCV1rzN6hw";

      //always send apiKey by default (GET,POST,PUT,DELETE)
      $httpProvider.defaults.headers.common = { 'apikey' : apiKey };
  }]);
