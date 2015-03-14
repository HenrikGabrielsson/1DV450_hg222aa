mapApp.factory("MapService", MapService)

MapService.$inject = ["$rootScope", "$location"];

function MapService($rootScope, $location)
{
  var map = null;
  var markers = [];
  
  //marker used when placing a marker on map, for edit or create
  var setMarker = $rootScope.setMarker;
  
  //puts the setMarker on provided position
  var setMemoryPosition = function(latLng)
  {
    //removes all other markers
    clearMarkers();
    
    //removes old marker if marker already has position
    if($rootScope.setMarker !== undefined)
    {
      $rootScope.setMarker.setMap(null)
    }

    $rootScope.setMarker = new google.maps.Marker({position: latLng, map: map});     
  }
  
  //removes all markers
  var clearMarkers = function()
  {    
    if($rootScope.setMarker !== undefined)
    {
      $rootScope.setMarker.setMap(null);
    }

    markers.forEach(function(marker)
    {
      marker.setMap(null);
    });
  }
  
  //place markers on map, given an array of memories with positions
  var setMarkers = function(memories) 
  {
    //get position of each memory and put on map.
    memories.forEach(function(memory)
    {
      var marker = new google.maps.Marker({position: new google.maps.LatLng(memory.latitude, memory.longitude), map: map});  

      //when a marker is clicked the user is relocated to that memory's page.
      marker.addListener('click', function()
      {
        $rootScope.$apply(function() 
        {
          $location.path('/memory/' + memory.id);
        });
      });

      markers.push(marker);
    })

  };  

  //on map load. Sets map variable.
  $rootScope.$on('mapInitialized', function(evt, evtMap) 
  { 
    map = evtMap;
  });
  
  return {
    setMemoryPosition: setMemoryPosition,
    clearMarkers: clearMarkers,
    setMarkers: setMarkers,
    setMarker: setMarker
    
  }
  
}