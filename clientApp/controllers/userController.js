mapApp.controller("UserController", UserController);

UserController.$inject = ["$routeParams","MemoryService", "MapService", "$location", "$scope", "$timeout"];

function UserController($routeParams, MemoryService, MapService, $location, $scope, $timeout)
{
  var vm = this;
  
  //user of this page
  vm.thisUser = null; 
  
  //if user is logged in, and the user from the localstorage
  vm.loggedIn = sessionStorage.getItem("token") !== null;
  
  //edit user
  vm.editUser = function(password, passwordConfirmation)
  {
    //send edited user to server
    MemoryService.editUser(vm.thisUser, password, passwordConfirmation, sessionStorage.getItem("token"))
    .success(function()
    {
       $location.path("/user/"+vm.thisUser.id)
    })
    .error(function(data)
    {
      if(data.error.constructor === Array)
      {
        vm.errorList = [];

        //remove the first word (Rails adds the name of the model for some reason)
        data.error.forEach(function(error, index)
                           {
          var tempArr = error.split(" ");
          tempArr.shift(); //remove first word

          vm.errorList.push(tempArr.join(" "))
        });
      }
      else
      {
        vm.errorMessage = "Det gick inte att redigera användaren"
      }
    }); 
  }

  vm.getMemoriesByUser = function(id)
  {
    MemoryService.getMemoriesByCreator(id)
    .success(function(memories)
    {
      $timeout(function()
      {
        $scope.$apply(function()
        {      
          //puts memories on map
          MapService.setMarkers(memories, $scope);
          
          $scope.memories = memories;
        })        
      })
    })
    .error(function()
    {
      vm.errorMessage = "Kunde inte hämta minnen vid detta tillfället.";
    })
  }
  
  //create new user.
  vm.createUser = function(userName, email, password, passwordConfirmation)
  {
    //user object
    var newUser = {creator: {userName: userName,  email: email, password: password, password_confirmation: passwordConfirmation}};
    
    MemoryService.createUser(newUser)
    .success(function(data)
    {
      vm.successMessage = "Du har registrerat dig som " +userName+ "."; 
    })
    .error(function(data)
    {
      if(data.error.constructor === Array)
      {
        vm.errorList = [];

        //remove the first word (Rails adds the name of the model for some reason)
        data.error.forEach(function(error, index)
                           {
          var tempArr = error.split(" ");
          tempArr.shift(); //remove first word

          vm.errorList.push(tempArr.join(" "))
        });
      }
      else
      {
        vm.errorMessage = "Det gick inte att registrera användaren av okänd anledning. Försök igen senare.";
      }
    });
  }
  
  //remove user
  vm.deleteUser = function()
  {
    //ugly confirm-box
    if(confirm("Vill du verkligen ta bort din profil?"))
    {
      MemoryService.deleteUser(vm.thisUser.id, sessionStorage.getItem("token"))
      .success(function()
      {
        //log out
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        //to da startpage!
        $location.path("/");   
      })
      .error(function()
      {
        vm.errorMessage = "Det gick inte att ta bort användaren vid detta tillfället."
      })
    }
  }
  
  //get one user, runs when page loads.
  var getUser = function()
  {
    MemoryService.getCreatorById($routeParams.id)
    .success(function(user)
    {
      vm.thisUser = user;
    })
    .error(function()
    {
      vm.errorMessage = "Kunde inte hämta användaren vid detta tillfället.";
    });
  }

  //not at create or edit
  if($routeParams.id !== undefined)
  {
    getUser(); 
    vm.getMemoriesByUser($routeParams.id);
  }
  
  
}