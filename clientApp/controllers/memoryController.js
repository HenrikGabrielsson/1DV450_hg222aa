mapApp.controller("MemoryController", MemoryController);

MemoryController.$inject = ["MemoryService", "MapService", "LoginService", "$routeParams", "$location", "$scope", "$timeout"];

function MemoryController(MemoryService, MapService, LoginService, $routeParams, $location, $scope, $timeout)
{
  var vm = this;
    
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
    
    //no position change
    if($scope.setMarker !== undefined)
    {
      vm.thisMemory.latitude = $scope.setMarker.position.k;
      vm.thisMemory.longitude = $scope.setMarker.position.D;
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
    MemoryService.editMemory(vm.thisMemory.id, memory, sessionStorage.getItem("token"), function(success, data)
    {
      if(success)
      {
        $location.path("/memory/" + vm.thisMemory.id)
      }
      else
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
      }
    });    
    
  }
  
  //create a new memory
  vm.createMemory = function(title, memoryText, eventDate, tags)
  {
    //must choose position. 
    if($scope.setMarker === undefined || $scope.setMarker === null)
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
        latitude: $scope.setMarker.position.k, 
        longitude: $scope.setMarker.position.D,
        eventDate: eventDate, 
        tags_attributes: tagsArray
      }
    }
    
    //to server we go!
    MemoryService.createMemory(memory, sessionStorage.getItem("token"), function(success, data)
    {
      if(success)
      {
        $location.path("/user/" + vm.loggedInUser.id);
      }
      else
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
              $location.path("/user/" + vm.loggedInUser.id);
            }
            else
            {
              vm.errorMessage = "Det gick inte att ta bort minnet. Försök igen senare.";
            }
          });
        }
  }
  
  //when users search, they are sent to the search result page. duh
  vm.searchMemories = function(term)
  {
    //stupid angular stuff that works so I wont touch it.
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
        vm.errorMessage = "Kunde inte hämta användare vid detta tillfället.";
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
        vm.errorMessage = "Kunde inte hämta taggar vid detta tillfället."; 
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
        MapService.clearMarkers(); //removes old memories 
        MapService.setMarkers(memories);
      }
      else
      {
        vm.errorMessage = "Kunde inte hämta minnen vid detta tillfället.";
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
        vm.errorMessage = "Kunde inte hämta minnet vid detta tillfället.";
      }
    });   
  }
  
  vm.logout = function()
  {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    
    vm.loggedIn = false;
  }
  
  //logged in user
  vm.thisUser = JSON.parse(sessionStorage.getItem("user"));
  
  //login with given credentials
  vm.login = function(userName, password)
  {
    LoginService.login(userName, password, function(loginSuccess, jwt)
    {
      if(loginSuccess)
      {   
        LoginService.getLoggedInUser(jwt.token, function(success, user)
        {
          if(success)
          {
            //save user and jwt token in sessionStorage.
            sessionStorage.setItem("token", jwt.token);
            sessionStorage.setItem("user", JSON.stringify(user))
            
            vm.loggedIn = true;
            
            vm.successMessage = "Du är nu inloggad som " + JSON.parse(sessionStorage.getItem("user")).userName;
          }
          else
          {
            vm.errorMessage = "Något gick fel vid inloggningen. Försök igen senare";
          }
        });

      }
      else
      { 
        vm.errorMessage = "Fel användarnamn och/eller lösenord";
      }

    });                      
  }

  //if a term is given...
  if($routeParams.term !== undefined)
  {
    vm.term = $routeParams.term;
  }

  //if a specified memory is wanted.
  if($routeParams.id !== undefined)
  {
    vm.getMemoryById($routeParams.id)
  }
     
}


