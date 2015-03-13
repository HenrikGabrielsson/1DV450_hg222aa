mapApp.controller("TagController", TagController);

TagController.$inject = ["MemoryService", "$rootScope", "$routeParams"];

function TagController(MemoryService, $rootScope, $routeParams)
{
  var vm = this;

  var getTagById = function(id)
  {
    MemoryService.getTagById(id, function(success, tag)
    {
      if(success)
      {
        vm.thisTag = tag;
      }
      else
      {
        //error
      }
    })
  }

  getTagById($routeParams.id);

  return vm;
}

