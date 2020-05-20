var fstr = firebase.firestore()
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

  /* Add an event listener to the user's click on the map
  When the event is registered, the placeMarker function will be called
  with the passed argument being the current mouse coordinates,
  or event.latLng */ 
  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });
  // The placeMarker function definition
  function placeMarker(location) { // the location argument being event.latLng
    // Create a new marker
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      // We could also add custom icons
      icon: iconChosen,
      draggable: true
    });
    // Delete marker with doubleclick
    marker.addListener('dblclick', function() {
      marker.setMap(null);
    });
    // Define the function to create and return an InfoWindow with 3 arguments
    function getInfo(infoName, infoDescription, contact) {
      return new google.maps.InfoWindow({
        content: '<div><h3>' + infoName + '</h3><p>Contact me through: ' + contact + '</p><p><em>' + infoDescription + '</em></p></div>'
      });
    }
    // Initialize the array
    var infoArr;
    // Define the function that takes the form value as soon as it is submitted
    function submitInfo() {
      var infoName = document.getElementById("name-field").value;
      var infoDescription = document.getElementById("description-field").value;
      var contact = document.getElementById("contact-number").value;
      return [infoName, infoDescription, contact];
    }
    // Listen to the submit and get the values as an array
    document.getElementById("change").addEventListener("click", infoArr = submitInfo());
    // Generate the InfoWindow with the previously submitted values
    marker.addListener("click", function() {
      var infoWindow = getInfo(...infoArr);
      // Sppread the array
      infoWindow.open(map, marker);
    });
    // console.log(iconChosen);
    function backendSubmit(backArr) {
      const arrayify = /\d+.\d+/g;
      backArr.push(...location.toString().match(arrayify));
      backArr.unshift(firebase.auth().currentUser.email);
      backArr.push(iconChosen);
      console.log(backArr);
      var backObj = {};
      backObj.email = backArr[0];
      backObj.name = backArr[1];
      backObj.description = backArr[2];
      backObj.contactinfo = backArr[3];
      backObj.lat = backArr[4];
      backObj.lng = backArr[5];
      backObj.type = backArr[6]; 
      fstr.collection("infoinput").add(backObj)
      .then(function(docRef) {
        console.log("Written with document ID " + docRef.id);
      }).catch(function(error) {
        console.log("Error: " + error);
      })
    }
    backendSubmit(infoArr);
  }
  
}
// Adding function to unreleashed products to say they're unreleashed
document.getElementById("coming").addEventListener("click", function() {
  alert("Feature not added yet!")
}); 