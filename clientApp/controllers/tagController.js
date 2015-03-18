mapApp.controller("TagController", TagController);

TagController.$inject = ["MemoryService", "$routeParams"];

function TagController(MemoryService, $routeParams)
{
  var vm = this;

  //get one tag by id
  var getTagById = function(id)
  {
    MemoryService.getTagById(id)
    .success(function(tag)
    {
      vm.thisTag = tag;
    })
    .error(function()
    {
      vm.errorMessage = "Det gick inte att hämta denna tagg för tillfället. Försök senare";
    });
  }

  //run on load
  getTagById($routeParams.id);

  return vm;
}

