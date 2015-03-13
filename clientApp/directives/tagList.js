mapApp.directive('tagList', ['$compile','MemoryService', "MapService", function($compile, MemoryService, MapService){
    
    var getElementsAndCreateList = function(scope, element, attr)
    {
      var createOutput = function(success, tags)
      {
        if(success)
        { 
          if(tags !== undefined)
          {          
            var li, link;
            tags.forEach(function(tag)
            {
              li = document.createElement("li");
              link = document.createElement("a");
              link.setAttribute("href", "./tag/" + tag.id);
              link.appendChild(document.createTextNode(tag.tag));
              li.appendChild(link);

              element.append(li);       
            })
          }
        }
        else
        {
          //error
        }
      }

      if(attr.memory !== undefined)
      {
        attr.$observe("memory", function()
        {
          MemoryService.getMemoryById(attr.memory, function(success, memory)
          {
            if(success)
            {
              createOutput(true, memory.tags)
            }
            else
            {
              createOutput(false)
            }
          }, attr.limit, attr.offset)
        })            
      }
  
      else
      {
        MemoryService.getAllTags(createOutput, attr.limit, attr.offset)
      }
    }
  
    return {
        restrict: 'A',
        link: getElementsAndCreateList
    }
 }]);