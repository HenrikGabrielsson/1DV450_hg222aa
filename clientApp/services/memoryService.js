mapApp.factory("MemoryService", MemoryService);

MemoryService.$inject = ['$http'];

function MemoryService(http)
{  
  var sendHTTP = function(url, method, params, headers, callback)
  {
    var config = {
      url : url,
      method: method
    }
    if(params !== null)
    {
      config.params = params;
    }
    if(headers !== null)
    {
      config.headers = headers;
    }
    
    http(config)
    .success(function(data)
    {
      callback(true, data);  
    })
    .error(function(data)
    {
      callback(false, data);
    })
  }

  var getAllMemories = function(callback, limit, offset)
  {
    params = {};
    
    if(limit !== undefined)
    {
      params.limit = limit;
    }
    if(offset !== undefined)
    {
      params.offset = offset;
    }
    
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/memories", "GET", params, null, callback)
  }
  
  var getCreatorById = function(id, callback)
  {
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/creators/" + id, "GET", null, null, callback);    
  }
  
  
  
  var getMemoryById = function(id, callback)
  {
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/memories/" + id, "GET", null, null, callback);   
  }
  
  
  
  var getAllCreators = function(callback)
  {
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/creators", "GET", null, null, callback);     
  }
  
  
  
  var getAllTags = function(callback, limit, offset)
  {
    params = {};
    
    if(limit !== undefined)
    {
      params.limit = limit;
    }
    if(offset !== undefined)
    {
      params.offset = offset;
    }
    
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/tags", "GET", params, null, callback);   
  }
  
  
  
  var searchMemories = function(term, callback)
  {
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/search", "GET", {term: term}, null, callback) 
  }
  
  
  
  var getMemoriesByTag = function(id, callback, limit, offset)
  {
    params = {};
    
    if(limit !== undefined)
    {
      params.limit = limit;
    }
    if(offset !== undefined)
    {
      params.offset = offset;
    }
    
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com/tags/"+id+"/memories", "GET", params, null, callback)
  }
  
  
  
  var getMemoriesByCreator = function(id, callback, limit, offset)
  {
    params = {};
    
    if(limit !== undefined)
    {
      params.limit = limit;
    }
    if(offset !== undefined)
    {
      params.offset = offset;
    }
    
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com/creators/"+id+"/memories","GET", params, null, callback)
  }
  
  
  
  var getTagById = function(id, callback)
  {
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/tags/" + id, "GET", null, null, callback);
  }
  
  
  
  var editUser = function(user, password, passwordConfirmation, token, callback)
  {
    var params = {creator: {userName: user.userName, email: user.email, password: password, password_confirmation: passwordConfirmation}}
    var headers = {headers:{Authorization: token}};
    
    http.put("http://testapp-186134.euw1-2.nitrousbox.com:3000/creators/" + user.id, params, headers) 
    .success(function(data)
    {
      callback(true, data);  
    })
    .error(function(data)
    {
      callback(false, data);
    }); 
  }
  
  var deleteUser = function(id, token, callback)
  {
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/creators/" + id, "DELETE", null, {Authorization: token}, callback)      
  }
  
  
  var createUser = function(creator, callback)
  {
    http.post("http://testapp-186134.euw1-2.nitrousbox.com:3000/creators", creator)
    .success(function(data)
    {
      callback(true, data);  
    })
    .error(function(data)
    {
      callback(false, data);
    });        
  };
  
  var deleteMemory = function(id, token, callback)
  {
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/memories/" + id, "DELETE", null, {Authorization: token}, callback)
  }
  
  var editMemory = function(id, memory, token, callback)
  {
    var headers = {headers:{Authorization: token}};
    
    http.put("http://testapp-186134.euw1-2.nitrousbox.com:3000/memories/" + id, memory, headers)
    .success(function(data)
    {
      callback(true, data);  
    })
    .error(function(data)
    {
      callback(false, data);
    });    
  }
  
  var createMemory = function(memory, token, callback)
  {
    var headers = {headers:{Authorization: token}};
    
    http.post("http://testapp-186134.euw1-2.nitrousbox.com:3000/memories", memory, headers)
    .success(function(data)
    {
      callback(true, data);  
    })
    .error(function(data)
    {
      callback(false, data);
    });
  }
  
  return {
    getAllMemories: getAllMemories,
    searchMemories: searchMemories,
    getAllCreators: getAllCreators,
    getAllTags: getAllTags,
    getCreatorById: getCreatorById,
    getMemoriesByCreator: getMemoriesByCreator,
    getMemoriesByTag: getMemoriesByTag,
    getMemoryById: getMemoryById,
    getTagById: getTagById,
    editUser: editUser,
    deleteUser: deleteUser,
    createUser: createUser,
    deleteMemory: deleteMemory,
    editMemory: editMemory,
    createMemory: createMemory
  };
}




