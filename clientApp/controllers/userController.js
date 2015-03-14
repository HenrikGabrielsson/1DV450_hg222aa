mapApp.controller("UserController", UserController);

UserController.$inject = ["$routeParams","MemoryService"];

function UserController($routeParams, MemoryService)
{
  var vm = this;
  
  //user of this page
  vm.thisUser = null; 
  
  //if user is logged in, and the user from the locaklstorage
  vm.loggedIn = sessionStorage.getItem("token") !== null;
  vm.loggedInUser = JSON.parse(sessionStorage.getItem("user"));

  //edit user
  vm.editUser = function(password, passwordConfirmation)
  {
    //send edited user to server
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
  
  //create new user.
  vm.createUser = function(userName, email, password, passwordConfirmation)
  {
    //user object
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
  
  //remove user
  vm.deleteUser = function()
  {
    //ugly confirm-box
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
  
  //get one user, runs when page loads.
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