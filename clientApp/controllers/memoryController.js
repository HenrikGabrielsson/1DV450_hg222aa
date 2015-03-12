mapApp.controller("MemoryController", MemoryController);

MemoryController.$inject = ["MemoryService", "$rootScope", "$routeParams", "$location", "$scope"];

function MemoryController(MemoryService, $rootScope, $routeParams, $location, $scope)
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

  $rootScope.$on('mapInitialized', function(evt, evtMap) 
  { 
    $rootScope.map = evtMap;

    $rootScope.setMarkers = function(memories) 
    {
      if($rootScope.markers === undefined)
      {
        $rootScope.markers = [];
      }
      
      //remove all markers
      $rootScope.markers.forEach(function(marker)
      {
        marker.setMap(null);
      })
      
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
  
  vm.getMemoryById = function(id)
  {
    MemoryService.getMemoryById(id, function(success, memory)
    {
      if(success)
      {
        $rootScope.setMarkers(new Array(memory));
        vm.thisMemory = memory;
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

