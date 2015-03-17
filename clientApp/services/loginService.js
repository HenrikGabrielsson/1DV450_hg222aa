mapApp.factory("LoginService", LoginService);

LoginService.$inject = ['$http', "RESTAPI"];

function LoginService(http, RESTAPI)
{  
  //Sends user credentials to API to login
  var login = function(userName, password, callback)
  {  
    
    http(
    {
      url: RESTAPI+"/apilogin",
      method: "POST",
      params:
      {
        userName: userName,
        password: password
      }
    })
    .success(function(data)
    {
      callback(true, data)
    })
    .error(function(data)
    {
      callback(false, data);
    })
  }
  
  //get the logged in user information from given jwt
  var getLoggedInUser = function(jwt, callback)
  {
    http(
    {
      url: RESTAPI + "/me",
      method: "GET",
      headers: {Authorization: jwt}
    })
    .success(function(data)
    {
      callback(true, data)
    })
    .error(function(data)
    {
      callback(false, data);
    });    
  }

  return {
    login: login,
    getLoggedInUser: getLoggedInUser,
  }
  
}