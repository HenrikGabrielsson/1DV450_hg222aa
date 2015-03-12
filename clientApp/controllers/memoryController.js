mapApp.controller("MemoryController", MemoryController);

MemoryController.$inject = ["MemoryService", "$rootScope", "$routeParams", "$location", "$scope"];

function MemoryController(MemoryService, $rootScope, $routeParams, $location, $scope)
{
  var vm = this;

  vm.tags = null;
  vm.creators = null;
  
  vm.loggedIn = localStorage.getItem("token") !== null;
  vm.loggedInUser = JSON.parse(localStorage.getItem("user"));
  
 
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
        tags_attributes: tagsArray
      }
    }

    MemoryService.editMemory(vm.thisMemory.id, memory, localStorage.getItem("token"), function(success, data)
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
    

    MemoryService.createMemory(memory, localStorage.getItem("token"), function(success, data)
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
          MemoryService.deleteMemory(vm.thisMemory.id, localStorage.getItem("token"), function(success,data)
          {
            if(success)
            {
              console.log("done")
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
    
    MemoryService.searchMemories(term, function(success, memories)
    {     
      if(success)
      {
        $rootScope.setMarkers(memories);
      }
      else
      {
        //TODO: IDONT KNOW
      }
    })
  }
  
  vm.putMemoryOnMap = function(memory)
  {
    $rootScope.setMarker = new google.maps.Marker({position: new google.maps.LatLng(memory.latitude, memory.longitude), map: $rootScope.map});
  }
  
  $rootScope.setMemoryPosition = function(latLng)
  {
    if($rootScope.setMarker !== undefined)
    {
      $rootScope.setMarker.setMap(null);
    }
    $rootScope.setMarker = new google.maps.Marker({position: latLng, map: $rootScope.map});     
  }

  vm.getPosFromMapClick = function(e)
  {
    if($location.path() == "/memory/create" || $location.path().match(/\/memory\/edit\//) !== null)
    {
      $rootScope.setMemoryPosition(e.latLng);
    }
  }



  $rootScope.$on('mapInitialized', function(evt, evtMap) 
  { 
    $rootScope.map = evtMap;

    
    //removes all markers
    $rootScope.clearMarkers = function()
    {  
      $rootScope.markers.forEach(function(marker)
      {
        marker.setMap(null);
      });
    }
    
    $rootScope.setMarkers = function(memories) 
    {
      if($rootScope.markers === undefined)
      {
        $rootScope.markers = [];
      }
      
      $rootScope.clearMarkers();
      
      memories.forEach(function(memory)
      {
        
        var marker = new google.maps.Marker({position: new google.maps.LatLng(memory.latitude, memory.longitude), map: $rootScope.map});  
        
        marker.addListener('click', function()
        {
          $scope.$apply(function() 
          {
            $location.path('/memory/' + memory.id);
          });
        });
        
        
        $rootScope.markers.push(marker);
      })
      
    };
  });


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
        $rootScope.setMarkers(memories);
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
        $rootScope.setMarkers(new Array(memory));
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

