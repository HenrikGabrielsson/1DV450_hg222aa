mapApp.factory("MemoryService", MemoryService);

MemoryService.$inject = ['$http'];

function MemoryService(http)
{  
  
  /*
  a simple http function that sends a request via HTTP (with chosen method, params, headers) and then calls the provided
  callback function that sends back the answer from the server and a bool that that tells the user if the request was successful
  */
  var sendHTTP = function(url, method, params, headers, callback)
  {
    var config = {
      url : url,
      method: method
    }
    
    //set params and headers if present
    if(params !== null)
    {
      config.params = params;
    }
    if(headers !== null)
    {
      config.headers = headers;
    }
    
    //send request and run callback on response
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

  //get all memories, with optional limit,offset
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
  
  //get one creator by id
  var getCreatorById = function(id, callback)
  {
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/creators/" + id, "GET", null, null, callback);    
  }
  
  
  //get one memory by id
  var getMemoryById = function(id, callback)
  {
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/memories/" + id, "GET", null, null, callback);   
  }
  
  
  //get all creators
  var getAllCreators = function(callback)
  {
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/creators", "GET", null, null, callback);     
  }
  
  
  //get all tags with optional limit, offset
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
  
  
  //returns memories that matches given term
  var searchMemories = function(term, callback)
  {
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/search", "GET", {term: term}, null, callback) 
  }
  
  
  //get memories that contains given tag, with optional limit and offset
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
  
  
  //get all memories created by creator, with optional limit, offset
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
  
  
  //get one tag
  var getTagById = function(id, callback)
  {
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/tags/" + id, "GET", null, null, callback);
  }
  
  //edit Creator
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
  
  //delete given creator
  var deleteUser = function(id, token, callback)
  {
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/creators/" + id, "DELETE", null, {Authorization: token}, callback)      
  }
  
  //create a new creator
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
  
  //delete memory
  var deleteMemory = function(id, token, callback)
  {
    sendHTTP("http://testapp-186134.euw1-2.nitrousbox.com:3000/memories/" + id, "DELETE", null, {Authorization: token}, callback)
  }
  
  //edit memory
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
  
  //create new memory
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




