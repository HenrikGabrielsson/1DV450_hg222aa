mapApp.controller("UserController", UserController);

UserController.$inject = ["$routeParams","MemoryService"];

function UserController($routeParams, MemoryService)
{
  var vm = this;
  
  vm.thisUser = null; 
  
  vm.loggedIn = localStorage.getItem("token") !== null;
  vm.loggedInUser = JSON.parse(localStorage.getItem("user"));

  vm.editUser = function(password, passwordConfirmation)
  {
    MemoryService.editUser(vm.thisUser, password, passwordConfirmation, localStorage.getItem("token"), function(success,data)
    {
      if(success)
      {
        //edit succeded
      }
      else
      {
        //error
      }
    });
  }
  
  vm.deleteUser = function()
  {
    if(confirm("Vill du verkligen ta bort din profil?"))
    {
      MemoryService.deleteUser(vm.thisUser.id, localStorage.getItem("token"),function(success,data)
      {
        if(success)
        {
          //success
        }
        else
        {
          //error
        }
      });
    }
  }
  
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