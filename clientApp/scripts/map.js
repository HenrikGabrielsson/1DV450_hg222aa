var mapDiv = document.getElementById('mapDiv');

function loadMap() {
  var mapOptions = {
    center: { lat: -34.397, lng: 150.644},
    zoom: 8
  };
  var map = new google.maps.Map(mapDiv,
                                mapOptions);
}

google.maps.event.addDomListener(mapDiv,'load', loadMap);