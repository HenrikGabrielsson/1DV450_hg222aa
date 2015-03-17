mapApp.factory("MapService", MapService)

MapService.$inject = ["$location"];

function MapService($location)
{
  var markers = [];
  var map;
  
  //marker used when placing a marker on map, for edit or create
  var setMarker;
  
  //puts the setMarker on provided position
  var setMemoryPosition = function(latLng)
  {
    //removes all other markers
    clearMarkers();
    
    //removes old marker if marker already has position
    if(setMarker !== undefined)
    {
      setMarker.setMap(null)
    }

    setMarker = new google.maps.Marker({position: latLng, map: map});     
  }
  
  //removes all markers
  var clearMarkers = function()
  {    
    if(setMarker !== undefined)
    {
      setMarker.setMap(null);
    }

    markers.forEach(function(marker)
    {
      marker.setMap(null);
    });
  }
  
  //place markers on map, given an array of memories with positions
  var setMarkers = function(memories, scope) 
  {
    //get position of each memory and put on map.
    memories.forEach(function(memory)
    {
      var marker = new google.maps.Marker({position: new google.maps.LatLng(memory.latitude, memory.longitude), map: map});  

      //when a marker is clicked the user is relocated to that memory's page.
      marker.addListener('click', function()
      {
        scope.$apply(function() 
        {
          $location.path('/memory/' + memory.id);
        });
      });

      markers.push(marker);
    })

  };  

  var getSetMarker = function()
  {
    return setMarker;
  }
  
  var setMap = function(paramMap)
  {
    map = paramMap;
  }

  return {
    setMemoryPosition: setMemoryPosition,
    clearMarkers: clearMarkers,
    setMarkers: setMarkers,
    setMarker: setMarker,
    setMap: setMap,
    getSetMarker: getSetMarker
    
  }
  
}