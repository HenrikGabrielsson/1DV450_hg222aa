mapApp.directive('memoryList', ['$compile','MemoryService','MapService' , function($compile, MemoryService, MapService){
    
    //creates list and puts markers on map.
    var getElementsAndCreateList = function(scope, element, attr)
    {
      
      //callback function that runs when memories has been recieved from API
      var createOutput = function(success, memories)
      {
        //empties map and puts memories on map
        MapService.clearMarkers();
        MapService.setMarkers(memories)
        
        if(success)
        {
          var li, link;
          memories.forEach(function(memory)
          {
            //creates link for each provided memory and adds to list
            li = document.createElement("li");
            link = document.createElement("a");
            link.setAttribute("href", "./memory/" + memory.id);
            link.appendChild(document.createTextNode(memory.title));
            li.appendChild(link);

            element.append(li);       
          })
        }
        else
        {
          element.text("Det gick inte att hämta minnen just nu.");
        }
      }
      
      //if a user is selected, only memories from that user will be recieved 
      if(attr.user !== undefined)
      {
        attr.$observe("user", function()
        {
          MemoryService.getMemoriesByCreator(attr.user, createOutput, attr.limit, attr.offset)
        })        
      }

      //if a tag is selected, only memories with that tag will be recieved 
      else if(attr.tag !== undefined)
      {
        attr.$observe("tag", function()
        {
          MemoryService.getMemoriesByTag(attr.tag, createOutput, attr.limit, attr.offset)
        })            
      }
      
      //creates list from given search term
      else if(attr.search !== undefined)
      {
        attr.$observe("search", function()
        {
          MemoryService.searchMemories(attr.search, createOutput, attr.limit, attr.offset)
        })
      }
   
      //if nothing else is specified, get all Memories
      else
      {
        MemoryService.getAllMemories(createOutput, attr.limit, attr.offset)
      }
      
    }
  
    return {
        restrict: 'A',
        link: getElementsAndCreateList
    }
 }]);