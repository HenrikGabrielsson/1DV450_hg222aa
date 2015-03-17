mapApp.factory("LoginService", LoginService);

LoginService.$inject = ['$http', "RESTAPI"];

function LoginService(http, RESTAPI)
{  
  //Sends user credentials to API to login
  var login = function(userName, password, callback)
  {     
    return http(
    {
      url: RESTAPI+"/apilogin",
      method: "POST",
      params:
      {
        userName: userName,
        password: password
      }
    });
  }
  
  //get the logged in user information from given jwt
  var getLoggedInUser = function(jwt)
  {
    return http(
    {
      url: RESTAPI + "/me",
      method: "GET",
      headers: {Authorization: jwt}
    });
  }

  return {
    login: login,
    getLoggedInUser: getLoggedInUser,
  }
  
}