mapApp.directive('tagList', ['$compile','MemoryService', function($compile, MemoryService){
    
  //Creates list of tags
  var getElementsAndCreateList = function(scope, element, attr)
  {
    //callback function that runs when tags are recieved from server
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
        element.text("Det gick inte att hämta taggar just nu.");
      }
    }

    //if a memory is provided, only the tags for that memory is requested
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
      });            
    }

    //..otherwise, all tags.
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