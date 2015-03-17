mapApp.factory("MemoryService", MemoryService);

MemoryService.$inject = ['$http', "RESTAPI"];

function MemoryService(http, RESTAPI)
{  
  
  
  //a simple http function that sends a request via HTTP (with chosen method, params, headers) and then returns the promise
  var sendHTTP = function(url, method, params, headers)
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
    
    //send request and return.
    return http(config);
  }

  //get all memories, with optional limit,offset
  var getAllMemories = function(limit, offset)
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
    
    return sendHTTP(RESTAPI + "/memories", "GET", params, null)
  }
  
  //get one creator by id
  var getCreatorById = function(id)
  {
    return sendHTTP(RESTAPI + "/creators/" + id, "GET", null, null);    
  }
  
  //get one memory by id
  var getMemoryById = function(id)
  {
    return sendHTTP(RESTAPI + "/memories/" + id, "GET", null, null);   
  }
  
  //get all tags with optional limit, offset
  var getAllTags = function(limit, offset)
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
    
    return sendHTTP(RESTAPI + "/tags", "GET", params, null);   
  }
  
  
  //returns memories that matches given term
  var searchMemories = function(term)
  {
    return sendHTTP(RESTAPI + "/search", "GET", {term: term}, null);
  }
  
  
  //get memories that contains given tag, with optional limit and offset
  var getMemoriesByTag = function(id, limit, offset)
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
    
    return sendHTTP(RESTAPI + "/tags/"+id+"/memories", "GET", params, null)
  }
  
  
  //get all memories created by creator, with optional limit, offset
  var getMemoriesByCreator = function(id, limit, offset)
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
    
    return sendHTTP(RESTAPI + "/creators/"+id+"/memories","GET", params, null)
  }
  
  
  //get one tag
  var getTagById = function(id)
  {
    return sendHTTP(RESTAPI + "/tags/" + id, "GET", null, null);
  }
  
  //edit Creator
  var editUser = function(user, password, passwordConfirmation, token)
  {
    var params = {creator: {userName: user.userName, email: user.email, password: password, password_confirmation: passwordConfirmation}}
    var headers = {headers:{Authorization: token}};
    
    return http.put(RESTAPI + "/creators/" + user.id, params, headers);
  }
  
  //delete given creator
  var deleteUser = function(id, token)
  {
    return sendHTTP(RESTAPI + "/creators/" + id, "DELETE", null, {Authorization: token});     
  }
  
  //create a new creator
  var createUser = function(creator)
  {
    return http.post(RESTAPI + "/creators", creator);       
  };
  
  //delete memory
  var deleteMemory = function(id, token)
  {
    return sendHTTP(RESTAPI + "/memories/" + id, "DELETE", null, {Authorization: token});
  }
  
  //edit memory
  var editMemory = function(id, memory, token)
  {
    var headers = {headers:{Authorization: token}};
    
    return http.put(RESTAPI + "/memories/" + id, memory, headers);   
  }
  
  //create new memory
  var createMemory = function(memory, token)
  {
    var headers = {headers:{Authorization: token}};
    
    return http.post(RESTAPI + "/memories", memory, headers);
  }
  
  return {
    getAllMemories: getAllMemories,
    searchMemories: searchMemories,
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




