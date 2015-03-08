mapApp.factory("MemoryService", MemoryService);

MemoryService.$inject = ['$http'];

function MemoryService($http)
{  

  loggedIn = "not logged in";
  
  var login = function(userName, password, callback)
  {  
    $http(
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
      console.log(data)
      callback(true, data)
    })
    .error(function()
    {
      callback(false, "nothing");
    })
  }

 
  return {
    login: login,
    loggedIn: "not logged In"
  };
}




