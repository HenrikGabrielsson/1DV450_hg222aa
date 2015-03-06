mapApp.controller("MemoryController", MemoryController);

MemoryController.$inject = ["$scope",'MemoryService'];

function MemoryController($scope, MemoryService)
{
  
  $scope.test =MemoryService.test;
  
};

