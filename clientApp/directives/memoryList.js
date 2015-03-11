mapApp.directive('memoryList', ['$compile','MemoryService', function($compile, MemoryService){
    
    var getElementsAndCreateList = function(scope, element, attr)
    {
      var createOutput = function(success, memories)
      {
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
      
      //user specified
      if(attr.user !== undefined)
      {
        MemoryService.getMemoriesByCreator(attr.user, createOutput, attr.limit, attr.offset)
      }
      
      //tag specified
      else if(attr.tag !== undefined)
      {
        MemoryService.getMemoriesByTag(attr.tag, createOutput, attr.limit, attr.offset)
      }
      
      //all
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