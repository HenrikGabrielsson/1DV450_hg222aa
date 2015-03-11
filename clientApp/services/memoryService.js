mapApp.factory("MemoryService", MemoryService);

MemoryService.$inject = ['$http'];

function MemoryService(http)
{  

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
    
    
    
    http(
    {
      url:"http://testapp-186134.euw1-2.nitrousbox.com:3000/memories",
      method: "GET",
      params: params
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
  
  var getCreatorById = function(id, callback)
  {
    http(
    {
      url:"http://testapp-186134.euw1-2.nitrousbox.com:3000/creators/" + id,
      method: "GET"
    })
    .success(function(data)
    {
      callback(true, data);  
    })
    .error(function(data)
    {
      callback(false, "error message");
    });       
  }
  
  var getAllCreators = function(callback)
  {
    http(
    {
      url:"http://testapp-186134.euw1-2.nitrousbox.com:3000/creators",
      method: "GET"
    })
    .success(function(data)
    {
      callback(true, data);  
    })
    .error(function(data)
    {
      callback(false, "error message");
    });        
  }
  
  var getAllTags = function(callback)
  {
    http(
    {
      url:"http://testapp-186134.euw1-2.nitrousbox.com:3000/tags",
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
  
  var searchMemories = function(term, callback)
  {
    http(
    {
      url:"http://testapp-186134.euw1-2.nitrousbox.com:3000/search",
      method: "GET",
      params: {term: term}
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
    
    http(
    {
      url:"http://testapp-186134.euw1-2.nitrousbox.com/tags/"+id+"/memories",
      method: "GET",
      params: params
    })
    .success(function(data)
    {
      callback(true, data);  
    })
    .error(function(data)
    {
      callback(false, "error message");
    }); 
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
    
    http(
    {
      url:"http://testapp-186134.euw1-2.nitrousbox.com/creators/"+id+"/memories",
      method: "GET",
      params: params
    })
    .success(function(data)
    {
      callback(true, data);  
    })
    .error(function(data)
    {
      callback(false, "error message");
    }); 
  }
  
  return {
    getAllMemories: getAllMemories,
    searchMemories: searchMemories,
    getAllCreators: getAllCreators,
    getAllTags: getAllTags,
    getCreatorById: getCreatorById,
    getMemoriesByCreator: getMemoriesByCreator,
    getMemoriesByTag: getMemoriesByTag
  };
}




