mapApp.controller("MemoryController", MemoryController);

MemoryController.$inject = ['MemoryService'];

function MemoryController(MemoryService)
{
  var vm = this;
  
  vm.test = MemoryService.loggedIn;
  
  vm.login = function(userName, password)
  {
    MemoryService.login(userName, password, function(loginSuccess, jwt)
    {
      if(loginSuccess)
      {
        localStorage.setItem("token", jwt);
      
        vm.test = localStorage.getItem("token");
      }
      else
      {
        vm.test = "fail!";    
      }

    });                      
  }
  

  
}

