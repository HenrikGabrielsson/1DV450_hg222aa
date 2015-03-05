mapApp.controller("MemoryController", ['$scope', MemoryController]);

function MemoryController($scope, MemoryService)
{
  var vm = this;
  $scope.test = function()
  {
    return MemoryService.alerts();
  }
  
};

