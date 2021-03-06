mapApp.controller("MemoryController", MemoryController);

MemoryController.$inject = ["MemoryService", "MapService", "LoginService", "$routeParams", "$location", "$scope", "$timeout"];

function MemoryController(MemoryService, MapService, LoginService, $routeParams, $location, $scope, $timeout)
{
  var vm = this;
    
  vm.tags = null;
  vm.creators = null;

  $scope.memories = null;
  $scope.tags = null;
  
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
    
    //no position change
    if(MapService.getSetMarker() !== undefined)
    {
      vm.thisMemory.latitude = MapService.getSetMarker().position.k;
      vm.thisMemory.longitude = MapService.getSetMarker().position.D;
    }    
    
    //the memory object as the API wants it 
    var memory = {
      memory: 
      {
        title: vm.thisMemory.title, 
        memoryText: vm.thisMemory.memoryText, 
        latitude: vm.thisMemory.latitude,
        longitude: vm.thisMemory.longitude,
        eventDate: vm.thisMemory.eventDate, 
      }
    }
    
    //don't send array if no tags (i.e one empty tag)
    if(vm.thisMemory.tags[0].tag !== "") 
    {
      memory.memory.tags_attributes = vm.thisMemory.tags
    }
    

    //and off you go to server you filthy memory
    MemoryService.editMemory(vm.thisMemory.id, memory, sessionStorage.getItem("token"))
    .success(function()
    {
      $location.path("/memory/" + vm.thisMemory.id) 
    })
    .error(function(data)
    {
      if(data.error.constructor === Array)
      {
        vm.errorList = [];

        //remove the first word (Rails adds the name of the model for some reason)
        data.error.forEach(function(error, index)
                           {
          var tempArr = error.split(" ");
          tempArr.shift(); //remove first word

          vm.errorList.push(tempArr.join(" "))
        });
      }
      else
      {
        vm.errorMessage = "Det gick inte att redigera minnet av okänd anledning. Försök igen senare.";
      }
    }); 
  }
  
  
  //create a new memory
  vm.createMemory = function(title, memoryText, eventDate, tags)
  { 
    //must choose position. 
    if(MapService.getSetMarker() === undefined || MapService.getSetMarker() === null)
    {
      vm.errorMessage = "Du måste välja en position genom att klicka på kartan";
      return;
    }
    
    //split tags on ',' to create array of tags   
    var tagsArray = tags !== undefined ? tags.split(",") : [];

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
        latitude: MapService.getSetMarker().position.k, 
        longitude:MapService.getSetMarker().position.D,
        eventDate: eventDate, 
        tags_attributes: tagsArray
      }
    }
        
    //to server we go!
    MemoryService.createMemory(memory, sessionStorage.getItem("token"))
    .success(function()
    {
      $location.path("/user/" + vm.loggedInUser.id);
    })
    .error(function(data)
    {
      if(data.error.constructor === Array)
      {
        vm.errorList = [];

        //remove the first word (Rails adds the name of the model for some reason)
        data.error.forEach(function(error, index)
        {
          var tempArr = error.split(" ");
          tempArr.shift(); //remove first word

          vm.errorList.push(tempArr.join(" "))
        });
      }
      else
      {
        vm.errorMessage = "Det gick inte att skapa minnet av okänd anledning. Försök igen senare.";
      }
    });
  }
  
  
  vm.getAllMemories = function(limit, offset)
  {
    MemoryService.getAllMemories(limit, offset)
    .success(function(memories)
    {
      //ugly solution to get memories to scope
      $timeout(function()
      {
        $scope.$apply(function()
        {
          //puts memories on map
          MapService.setMarkers(memories, $scope);
          
          $scope.memories = memories;  
        });
      })
    })
  };  

  
  
  
  //delete this memory
  vm.deleteMemory = function()
  {
    //a beautiful box to confirm removal.
    if(confirm("Vill du verkligen ta bort detta minne?"))
    {
      MemoryService.deleteMemory(vm.thisMemory.id, sessionStorage.getItem("token"))
        .success(function()
                 {
        $location.path("/user/" + vm.loggedInUser.id);
      })
        .error(function() 
               {          
        vm.errorMessage = "Det gick inte att ta bort minnet. Försök igen senare.";
      })
    }
  }
  
  //when users search, they are sent to the search result page. duh
  vm.searchMemories = function(term)
  {
    MemoryService.searchMemories(term)
    .success(function(memories)
    {
      $scope.memories = memories
      
      //stupid angular stuff that works so I wont touch it. Reroute to search results
      $timeout(function()
      {
        $scope.$apply(function() 
        {
          $location.path("/memory/search/" + term)
        })
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
 
  //on map load. Sets map variable.
  $scope.$on('mapInitialized', function(evt, evtMap) 
  { 
    MapService.setMap(evtMap);
  });
  
  
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
    MemoryService.getMemoryById(id)
    .success(function(memory)
    {
      MapService.clearMarkers();
      MapService.setMarkers(new Array(memory), $scope);

      $scope.tags = memory.tags;
      
      vm.thisMemory = memory;
      vm.thisMemoryTagsString = vm.createTagString(vm.thisMemory.tags);      
    })
    .error(function()
    {
      vm.errorMessage = "Kunde inte hämta minnet vid detta tillfället.";
    });
  }
  
  vm.logout = function()
  {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    
    vm.loggedIn = false;
    vm.loggedInUser = null;
  }

  //login with given credentials
  vm.login = function(userName, password)
  {
    LoginService.login(userName, password)
    .success(function(jwt)
    {
      LoginService.getLoggedInUser(jwt.token)
      .success(function(user)
      {
        //save user and jwt token in sessionStorage.
        sessionStorage.setItem("token", jwt.token);
        sessionStorage.setItem("user", JSON.stringify(user))

        vm.loggedInUser = user;        
        vm.loggedIn = true;

        vm.successMessage = "Du är nu inloggad som " + JSON.parse(sessionStorage.getItem("user")).userName;        
      })
      .error(function()
      {
        vm.errorMessage = "Något gick fel vid inloggningen. Försök igen senare";
      })
    })
    .error(function()
    { 
      vm.errorMessage = "Fel användarnamn och/eller lösenord";
    });                   
  }
  
    var vm = this;

  //get one tag by id
  var getTagById = function(id)
  {
    MemoryService.getTagById(id)
    .success(function(tag)
    {
      vm.thisTag = tag;      
    })
    .error(function()
    {
      vm.errorMessage = "Det gick inte att hämta denna tagg för tillfället. Försök senare";
    });
  }
  
  var getMemoriesByTag = function(id)
  {    
    MemoryService.getMemoriesByTag(id)
    .success(function(memories)
    {  
      $timeout(function()
      {
        $scope.$apply(function()
        {
          //puts memories on map
          MapService.setMarkers(memories, $scope);
          
          $scope.memories = memories;
        })
      });
    })
  }
  
  vm.getAllTags = function(limit, offset)
  {
    MemoryService.getAllTags(limit, offset)
    .success(function(tags)
    {
      $scope.tags = tags;
    });
  }

  //if tag page
  if($routeParams.tag_id !== undefined)
  {
    getTagById($routeParams.tag_id);
    getMemoriesByTag($routeParams.tag_id)
  }

  //if a term is given a search should be done
  else if($routeParams.term !== undefined)
  {
    vm.term = $routeParams.term;
    vm.searchMemories(vm.term)
  }

  //if a specified memory is wanted.
  else if($routeParams.id !== undefined)
  {
    vm.getMemoryById($routeParams.id)
  }
  //index partial
  else
  {
    vm.getAllMemories(20);
    vm.getAllTags(20);
  }

}


