mapApp.directive('memoryList', ['$compile','MemoryService','MapService' , function($compile, MemoryService, MapService){
    
    //creates list and puts markers on map.
    var getElementsAndCreateList = function(scope, element, attr)
    {
      //function that gets the memories and outputs them
      var createOutput = function(data)
      {        
        data
        .success(function(memories)
        {
          //empties map and puts memories on map
          MapService.clearMarkers();
          MapService.setMarkers(memories, scope);
          
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
          });          
        })
        .error(function(){
          element.text("Det gick inte att hämta minnen just nu.");
        })
      }
      
      //if a user is selected, only memories from that user will be recieved 
      if(attr.user !== undefined)
      {
        attr.$observe("user", function()
        {
          createOutput(MemoryService.getMemoriesByCreator(attr.user, attr.limit, attr.offset));
        })        
      }

      //if a tag is selected, only memories with that tag will be recieved 
      else if(attr.tag !== undefined)
      {
        attr.$observe("tag", function()
        {
          createOutput(MemoryService.getMemoriesByTag(attr.tag,attr.limit, attr.offset));
        })            
      }
      
      //creates list from given search term
      else if(attr.search !== undefined)
      {
        attr.$observe("search", function()
        {
          createOutput(MemoryService.searchMemories(attr.search, attr.limit, attr.offset));
        })
      }
   
      //if nothing else is specified, get all Memories
      else
      {
        createOutput(MemoryService.getAllMemories(attr.limit, attr.offset));
      }
      
    }
  
    return {
        restrict: 'A',
        link: getElementsAndCreateList
    }
 }]);