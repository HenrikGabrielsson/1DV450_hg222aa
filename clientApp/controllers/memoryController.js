mapApp.controller("MemoryController", MemoryController);

MemoryController.$inject = ['MemoryService'];

function MemoryController(MemoryService)
{
  var vm = this;

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
        
        localStorage.setItem("token", jwt);
        vm.loggedIn = true;

      }
      else
      { 
        //TODO: error message
      }

    });                      
  }

}

