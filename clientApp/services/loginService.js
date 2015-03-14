mapApp.factory("LoginService", LoginService);

LoginService.$inject = ['$http'];

function LoginService(http)
{  
  //Sends user credentials to API to login
  var login = function(userName, password, callback)
  {  
    http(
    {
      url:"http://testapp-186134.euw1-2.nitrousbox.com:3000/apilogin",
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
      url:"http://testapp-186134.euw1-2.nitrousbox.com:3000/me",
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