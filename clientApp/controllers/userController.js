mapApp.controller("UserController", UserController);

UserController.$inject = ["$routeParams","MemoryService"];

function UserController($routeParams, MemoryService)
{
  var vm = this;
  
  vm.thisUser = null; 
  
  vm.loggedIn = sessionStorage.getItem("token") !== null;
  vm.loggedInUser = JSON.parse(sessionStorage.getItem("user"));

  vm.editUser = function(password, passwordConfirmation)
  {
    MemoryService.editUser(vm.thisUser, password, passwordConfirmation, sessionStorage.getItem("token"), function(success,data)
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
  
  vm.createUser = function(userName, email, password, passwordConfirmation)
  {
    var newUser = {creator: {userName: userName,  email: email, password: password, password_confirmation: passwordConfirmation}};
    
    MemoryService.createUser(newUser, function(success, data)
    {
      if(success)
      {
        //success
      }
      else
      {
        //error message
      }
    })
  }
  
  vm.deleteUser = function()
  {
    if(confirm("Vill du verkligen ta bort din profil?"))
    {
      MemoryService.deleteUser(vm.thisUser.id, sessionStorage.getItem("token"),function(success,data)
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