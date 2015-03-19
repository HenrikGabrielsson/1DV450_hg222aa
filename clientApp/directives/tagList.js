mapApp.directive('tagList', ['$compile', function($compile){
    
  //Creates list of tags
  var getElementsAndCreateList = function(scope, element, attr)
  {
    scope.$watch("tags", function()
    {
      var li, link;

      //remove old element
      element.html(""); 
      
      
      if(scope.tags === null)
      {
        return;
      }
      
      scope.tags.forEach(function(tag)
      {
        li = document.createElement("li");
        link = document.createElement("a");
        link.setAttribute("href", "./tag/" + tag.id);
        link.appendChild(document.createTextNode(tag.tag));
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