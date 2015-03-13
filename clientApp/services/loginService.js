mapApp.factory("LoginService", LoginService);

LoginService.$inject = ['$http'];

function LoginService(http)
{  
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
    .error(function()
    {
      callback(false, data);
    })
  }
  
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