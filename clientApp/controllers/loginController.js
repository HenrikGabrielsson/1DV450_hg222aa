mapApp.controller("LoginController", LoginController);

LoginController.$inject = ["LoginService"];

function LoginController(LoginService)
{
  var vm = this;

  vm.loggedIn = sessionStorage.getItem("token") !== null;

  vm.logout = function()
  {
    sessionStorage.removeItem("token");
    vm.loggedIn = false;
  }
  
  vm.thisUser = JSON.parse(sessionStorage.getItem("user"));
  
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
            //save user and jwt token in sessionStorage.
            sessionStorage.setItem("token", jwt.token);
            sessionStorage.setItem("user", JSON.stringify(user))
            
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

