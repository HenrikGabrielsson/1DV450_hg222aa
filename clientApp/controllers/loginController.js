mapApp.controller("LoginController", LoginController);

LoginController.$inject = ["LoginService"];

function LoginController(LoginService)
{
  var vm = this;

  vm.loggedIn = localStorage.getItem("token") !== null;

  vm.logout = function()
  {
    localStorage.removeItem("token");
    vm.loggedIn = false;
  }
  
  vm.thisUser = JSON.parse(localStorage.getItem("user"));
  
  vm.login = function(userName, password)
  {
    LoginService.login(userName, password, function(loginSuccess, jwt)
    {
      if(loginSuccess)
      {   
        LoginService.getLoggedInUser(jwt.token, function(success, user)
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

