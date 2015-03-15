mapApp.controller("LoginController", LoginController);

LoginController.$inject = ["LoginService"];

function LoginController(LoginService)
{
  var vm = this;

  //bool: logged in?
  vm.loggedIn = sessionStorage.getItem("token") !== null;
  
  vm.logout = function()
  {
    sessionStorage.removeItem("token");
    vm.loggedIn = false;
  }
  
  //logged in user
  vm.thisUser = JSON.parse(sessionStorage.getItem("user"));
  
  //login with given credentials
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
            
            vm.successMessage = "Du är nu inloggad som " + JSON.parse(sessionStorage.getItem("user")).userName;
          }
          else
          {
            vm.errorMessage = "Något gick fel vid inloggningen. Försök igen senare";
          }
        });

      }
      else
      { 
        vm.errorMessage = "Fel användarnamn och/eller lösenord";
      }

    });                      
  }

}

