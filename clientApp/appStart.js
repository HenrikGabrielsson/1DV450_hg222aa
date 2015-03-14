var mapApp = angular.module("mapApp", ["ngRoute", "ngMap"]);

mapApp.config(
  [
  '$routeProvider',
  '$locationProvider',
  '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider) 
    {
      //routing 
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
      .when("/user/create", {
        templateUrl: "partials/user_create.html",
        controller: "UserController",
        controllerAs: "user"
      })
      .when('/user/:id', {
        templateUrl: 'partials/user.html',
        controller: 'UserController',
        controllerAs: "user"
      })
      .when("/memory/create", {
        templateUrl: "partials/memory_create.html",
        controller: "MemoryController",
        controllerAs: "memory"
      })
      .when("/memory/edit/:id", {
        templateUrl: "partials/memory_edit.html",
        controller: "MemoryController",
        controllerAs: "memory"
      })
      .when("/memory/search/:term", {
        templateUrl: "partials/search_results.html",
        controller: "MemoryController",
        controllerAs: "memory"
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
      
      //pretty url
      $locationProvider.html5Mode(true);

      var apiKey = "6up-EkZyhWovOPjMNxm_3whVOCV1rzN6hw";

      //always send apiKey by default (needed for alla function in API)
      $httpProvider.defaults.headers.common = { 'apikey' : apiKey };
  }]);
