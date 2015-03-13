mapApp.directive('memoryList', ['$compile','MemoryService','$rootScope' , function($compile, MemoryService, $rootScope){
    
    var getElementsAndCreateList = function(scope, element, attr)
    {
      var createOutput = function(success, memories)
      {
        $rootScope.setMarkers(memories)
        
        if(success)
        {
          var li, link;
          memories.forEach(function(memory)
          {
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
          //error
        }
      }
      
      if(attr.user !== undefined)
      {
        attr.$observe("user", function()
        {
          MemoryService.getMemoriesByCreator(attr.user, createOutput, attr.limit, attr.offset)
        })        
      }

      else if(attr.tag !== undefined)
      {
        attr.$observe("tag", function()
        {
          MemoryService.getMemoriesByTag(attr.tag, createOutput, attr.limit, attr.offset)
        })            
      }
      
      else if(attr.search !== undefined)
      {
        attr.$observe("search", function()
        {
          MemoryService.searchMemories(attr.search, createOutput, attr.limit, attr.offset)
        })
      }
   
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