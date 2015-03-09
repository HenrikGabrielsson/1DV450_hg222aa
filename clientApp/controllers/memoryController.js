mapApp.controller("MemoryController", MemoryController);

MemoryController.$inject = ['MemoryService'];

function MemoryController(MemoryService)
{
  var vm = this;

  vm.getAllMemories = function()
  {
    MemoryService.getAllMemories(function(success, positions)
    {
      if(success)
      {
            
      }
      else
      {
        //TODO :ERROR message    
      }
      
    });
  }
  
  vm.getAllMemories();
  
  
  
  
  vm.loggedIn = localStorage.getItem("token") !== null;
  
  vm.logout = function()
  {
    localStorage.removeItem("token");
    vm.loggedIn = false;
  }
  
  vm.login = function(userName, password)
  {
    MemoryService.login(userName, password, function(loginSuccess, jwt)
    {
      if(loginSuccess)
      {   
        MemoryService.getLoggedInUser(jwt.token, function(success, user)
        {
          if(success)
          {
            //save user and jwt token in localstorage.
            localStorage.setItem("token", jwt.token);
            localStorage.setItem("user", JSON.stringify(user))
            
            vm.loggedIn = true;
          }
          else
          {
            //TODO: Some other error occurredd
          }

        });

      }
      else
      { 
        //TODO: error message (wrong user creds)
      }

    });                      
  }

}

