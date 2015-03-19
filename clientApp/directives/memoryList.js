mapApp.directive('memoryList', ['$compile', function($compile){
    
    //creates list and puts markers on map.
    var getElementsAndCreateList = function(scope, element, attr)
    {    
      scope.$watch("memories", function()
      {        
        var li, link;
        
        //remove old element
        element.html("");
        
        if(scope.memories === null)
        {
          return;
        }
        
        scope.memories.forEach(function(memory)
        {
          //creates link for each provided memory and adds to list
          li = document.createElement("li");
          link = document.createElement("a");
          link.setAttribute("href", "./memory/" + memory.id);
          link.appendChild(document.createTextNode(memory.title));
          li.appendChild(link);

          element.append(li);      
        })
      })
    }

  
    return {
        restrict: 'A',
        link: getElementsAndCreateList
    }
 }]);