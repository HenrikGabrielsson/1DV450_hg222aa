var mapApp = angular.module('mapApp', ['ngRoute']);

mapApp.config(function($routeProvider, $locationProvider)
{
  
  $routeProvider
  //index
  .when('/',
  {
    controller:"MemoryController",
    templateURL: "../partials/index.html"  
  })
  .otherwise({redirectTo: '/'});
  
  $locationProvider.html5Mode(true);
});
