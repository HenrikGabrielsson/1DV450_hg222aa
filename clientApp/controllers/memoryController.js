mapApp.controller("MemoryController", MemoryController);

MemoryController.$inject = ["MemoryService", "MapService", "$routeParams", "$location", "$scope", "$rootScope", "$timeout"];

function MemoryController(MemoryService, MapService, $routeParams, $location, $scope, $rootScope,  $timeout)
{
  var vm = this;

  //if a term is given...
  if($routeParams.term !== undefined)
  {
    vm.term = $routeParams.term;
  }
    
  vm.tags = null;
  vm.creators = null;
  
  //check login status and user
  vm.loggedIn = sessionStorage.getItem("token") !== null;
  vm.loggedInUser = JSON.parse(sessionStorage.getItem("user"));
  
 
  //edit a memory
  vm.editMemory = function(eventDate)
  {
    //split tags on ',' to create array of tags
    var tagsArray = vm.thisMemoryTagsString.split(",");

    //removes whitespace and creates "tag objects"
    tagsArray.forEach(function(tag, i, tags)
    {
      vm.thisMemory.tags[i] = {tag: tag.trim()};
    });     
    
    
    //only change eventDate if new one is given
    if(eventDate !== null && eventDate !== undefined)
    {
      vm.thisMemory.eventDate = eventDate;
    }
    
    //the memory object as the API wants it 
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

    //and off you go to server you filthy memory
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
  
  //create a new memory
  vm.createMemory = function(title, memoryText, eventDate, tags)
  {
    //split tags on ',' to create array of tags
    var tagsArray = tags.split(",");

    //removes whitespace and creates "tag objects"
    tagsArray.forEach(function(tag, i, tags)
    {
      tags[i] = {tag: tag.trim()};
    }); 

    //memory object
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
    
    //to server we go!
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
  
  //delete this memory
  vm.deleteMemory = function()
  {
    
    //a beautiful box to confirm removal.
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
  
  //when users search, they are sent to the search result page.
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
  
  //put a given memory on the map.
  vm.putMemoryOnMap = function(memory)
  {
    MapService.setMarker = new google.maps.Marker({position: new google.maps.LatLng(memory.latitude, memory.longitude), map: MapService.map});
  }

  //only for create and edit view. Gets position from a map click
  vm.getPosFromMapClick = function(e)
  {
    if($location.path() == "/memory/create" || $location.path().match(/\/memory\/edit\//) !== null)
    {
      MapService.setMemoryPosition(e.latLng);
    }
  };  
  
  //gets all creators
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
  
  //gets all tags
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

  //gets all memories
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
  
  //creates a string of tags to put in a textarea
  vm.createTagString = function(tags)
  {
    var tagNames = [];   
    tags.forEach(function(tag)
    {
      tagNames.push(tag.tag);
    })
    return tagNames.join();
  }
  
  //get one memory by id
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

  //if a specified memory is wanted.
  if($routeParams.id !== undefined)
  {
    vm.getMemoryById($routeParams.id)
  }

  return vm;

}

