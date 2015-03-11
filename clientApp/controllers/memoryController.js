mapApp.controller("MemoryController", MemoryController);

MemoryController.$inject = ["MemoryService", "MapService", "$rootScope"];

function MemoryController(MemoryService, MapService, $rootScope)
{
  var vm = this;

  vm.tags = null;
  vm.creators = null;
  
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
  
  $rootScope.markers = [];
  
  $rootScope.$on('mapInitialized', function(evt, evtMap) 
  { 
    $rootScope.map = evtMap;

    $rootScope.setMarkers = function(memories) 
    {
      //remove all markers
      $rootScope.markers.forEach(function(marker)
      {
        marker.setMap(null);
      })
      
      memories.forEach(function(memory)
      {
        $rootScope.markers.push(new google.maps.Marker({position: new google.maps.LatLng(memory.latitude, memory.longitude), map: $rootScope.map}));  
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
  
  vm.init = function()
  {
    vm.getAllMemories();
    vm.getAllTags();
    vm.getAllCreators();
  }
  
  vm.init();
  
  return vm;

}

