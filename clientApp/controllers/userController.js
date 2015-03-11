mapApp.controller("UserController", UserController);

UserController.$inject = ["$routeParams","MemoryService"];

function UserController($routeParams, MemoryService)
{
  var vm = this;
  
  vm.thisUser = null; 
  
  vm.loggedIn = localStorage.getItem("token") !== null;
  vm.loggedInUser = JSON.parse(localStorage.getItem("user"));

  var getUser = function()
  {

    MemoryService.getCreatorById($routeParams.id, function(success, user)
    {
      if(success)
      {
        vm.thisUser = user;
      }
      else
      {
        //horrifying error message here
      }
    })
  }

  
  getUser();
  
}