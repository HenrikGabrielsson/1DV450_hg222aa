mapApp.directive('tagList', ['$compile','MemoryService', function($compile, MemoryService){
    
  //Creates list of tags
  var getElementsAndCreateList = function(scope, element, attr)
  {
    //callback function that runs when tags are recieved from server
    var createOutput = function(tags)
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

    //if a memory is provided, only the tags for that memory is requested
    if(attr.memory !== undefined)
    {
      attr.$observe("memory", function()
      {
        MemoryService.getMemoryById(attr.memory, attr.limit, attr.offset)
        .success(function(memory)
        {
          createOutput(memory.tags);
        })
      });        
    }

    //..otherwise, all tags.
    else
    {
      MemoryService.getAllTags(attr.limit, attr.offset)
      .success(function(tags)
      {
        createOutput(tags);
      });
    }
  }

  return {
    restrict: 'A',
    link: getElementsAndCreateList
  }
 }]);