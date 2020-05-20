var map;
function initMap() {
  var mainFocus = new google.maps.LatLng(-34.397, 150.644);
  // Create center point of map when first acessing the website
  /* Create map options,
  center is the coordinates that the map will switch to 
  on first loading the website, this should be later on
  changed to the current user's coordinates
  zoom is the level of zoom the map will be on when first loaded,
  with 1 = the world map, 15 being street view */ 
  var mapOptions = {
    center: mainFocus,
    zoom: 15
  }
  /* Create map with the options above
  The Map takes two arguements
  First is the element to display the map, 
  which could be acess via its id using getElementById
  Second is an object to specify its properties */ 
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  /* Add an event listener to the user's double click on the map
  When the event is registered, the placeMarker function will be called
  with the passed argument being the current mouse coordinates,
  or event.latLng */ 
  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });
  // The placeMarker function definition
  function placeMarker(location) { // the location argument being even.latLng
    // Create a new marker
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      // We could also add custom icons
      icon: iconChosen,
      draggable: true
    });
    marker.addListener('dblclick', function() {
      marker.setMap(null);
    });
    marker.addListener("click", function() {
      var infoName = document.getElementById("name-field").value;
      var infoDescription = document.getElementById("description-field").value;
      var contact = document.getElementById("contact-number").value;
      var infoWindow = new google.maps.InfoWindow({
        content: '<div><h3>' + infoName + '</h3><p>Contact me through: ' + contact + '</p><p><em>' + infoDescription + '</em></p></div>'
      });
      infoWindow.open(map, marker);
    });
    console.log(iconChosen);
  }
  
}
// Adding function to unreleashed products to say they're unreleashed
document.getElementById("coming").addEventListener("click", function() {
  alert("Feature not added yet!")
}); 