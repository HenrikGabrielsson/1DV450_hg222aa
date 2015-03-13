mapApp.controller("MemoryController", MemoryController);

MemoryController.$inject = ["MemoryService", "MapService", "$routeParams", "$location", "$scope", "$rootScope", "$timeout"];

function MemoryController(MemoryService, MapService, $routeParams, $location, $scope, $rootScope,  $timeout)
{
  var vm = this;

  if($routeParams.term !== undefined)
  {
    vm.term = $routeParams.term;
  }
    
  vm.tags = null;
  vm.creators = null;
  
  vm.loggedIn = sessionStorage.getItem("token") !== null;
  vm.loggedInUser = JSON.parse(sessionStorage.getItem("user"));
  
 
  vm.editMemory = function(eventDate)
  {
    //split tags on ',' to create array of tags
    var tagsArray = vm.thisMemoryTagsString.split(",");

    //removes whitespace and creates "tag objects"
    tagsArray.forEach(function(tag, i, tags)
    {
      vm.thisMemory.tags[i] = {tag: tag.trim()};
    });     
    
    if(eventDate !== null && eventDate !== undefined)
    {
      vm.thisMemory.eventDate = eventDate;
    }
    
    var memory = {
      memory: 
      {
        title: vm.thisMemory.title, 
        memoryText: vm.thisMemory.memoryText, 
        latitude: $rootScope.setMarker.position.k, 
        longitude: $rootScope.setMarker.position.D,
        eventDate: vm.thisMemory.eventDate, 
        tags_attributes: vm.thisMemory.tags
      }
    }

    MemoryService.editMemory(vm.thisMemory.id, memory, sessionStorage.getItem("token"), function(success, data)
    {
      if(success)
      {
        
      }
      else
      {
        //error
      }
    });    
    
  }
  
  vm.createMemory = function(title, memoryText, eventDate, tags)
  {
    //split tags on ',' to create array of tags
    var tagsArray = tags.split(",");

    //removes whitespace and creates "tag objects"
    tagsArray.forEach(function(tag, i, tags)
    {
      tags[i] = {tag: tag.trim()};
    }); 

    var memory = {
      memory: 
      {
        title: title, 
        memoryText: memoryText, 
        latitude: $rootScope.setMarker.position.k, 
        longitude: $rootScope.setMarker.position.D,
        eventDate: eventDate, 
        tags_attributes: tagsArray
      }
    }
    

    MemoryService.createMemory(memory, sessionStorage.getItem("token"), function(success, data)
    {
      if(success)
      {
        //success
      }
      else
      {
        //error
      }
    });
  }
  
  vm.deleteMemory = function()
  {
    if(confirm("Vill du verkligen ta bort detta minne?"))
        {
          MemoryService.deleteMemory(vm.thisMemory.id, sessionStorage.getItem("token"), function(success,data)
          {
            if(success)
            {

            }
            else
            {
              //error
            }
          });
        }
  }
  
  vm.searchMemories = function(term)
  {
    $timeout(function()
    {
      $scope.$apply(function() 
      {
        $location.path("/memory/search/" + term)
      })
    })
  }
  
  vm.putMemoryOnMap = function(memory)
  {
    MapService.setMarker = new google.maps.Marker({position: new google.maps.LatLng(memory.latitude, memory.longitude), map: MapService.map});
  }


  vm.getPosFromMapClick = function(e)
  {
    if($location.path() == "/memory/create" || $location.path().match(/\/memory\/edit\//) !== null)
    {
      MapService.setMemoryPosition(e.latLng);
    }
  };  
  

  vm.getAllCreators = function()
  {
    MemoryService.getAllCreators(function(success, creators)
    {
      if(success)
      {
        vm.creators = creators;
      }
      else
      {
        //TODO :ERROR message    
      }
      
    });
  }
  
  vm.getAllTags = function()
  {
    MemoryService.getAllTags(function(success, tags)
    {
      if(success)
      {  
        vm.tags = tags;
      }
      else
      {
        //TODO :ERROR message    
      }
      
    });    
  }

  vm.getAllMemories = function()
  {
    MemoryService.getAllMemories(function(success, memories)
    {
      if(success)
      {
        MapService.clearMarkers();
        MapService.setMarkers(memories);
      }
      else
      {
        //TODO :ERROR message    
      }
      
    });
  }
  
  vm.createTagString = function(tags)
  {
    var tagNames = [];   
    tags.forEach(function(tag)
    {
      tagNames.push(tag.tag);
    })
    return tagNames.join();
  }
  
  vm.getMemoryById = function(id)
  {
    MemoryService.getMemoryById(id, function(success, memory)
    {
      if(success)
      {
        MapService.clearMarkers();
        MapService.setMarkers(new Array(memory));
        vm.thisMemory = memory;
        
        vm.thisMemoryTagsString = vm.createTagString(vm.thisMemory.tags);
      }
      else
      {
        //error.html
      }
    })    
  }
  
  if($routeParams.id !== undefined)
  {
    vm.getMemoryById($routeParams.id);
  }
  
  else
  {
    vm.getAllMemories();
    vm.getAllTags();
    vm.getAllCreators();
  }
  
  return vm;

}

