mapApp.factory("MemoryService", MemoryService);

MemoryService.$inject = ['$http'];

function MemoryService(http)
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
      callback(false, "nothing");
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
      callback(false, "this should be an error message");
    });    
  }

  var getAllMemories = function(callback)
  {
    http(
    {
      url:"http://testapp-186134.euw1-2.nitrousbox.com:3000/memories",
      method: "GET"
    })
    .success(function(data)
    {
      callback(true, data);  
    })
    .error(function(data)
    {
      callback(false, "error message");
    })
  }
 
  return {
    login: login,
    getLoggedInUser: getLoggedInUser,
    getAllMemories: getAllMemories
  };
}




