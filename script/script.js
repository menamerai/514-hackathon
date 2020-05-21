var fstr = firebase.firestore()
var map;
var uploadDone = false;
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
  var bmap = new google.maps.Map(document.getElementById("bmap"), mapOptions);
  // Get all of the marker data
  fstr.collection("infoinput").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      console.log(doc.data());
      // Load every markers for the business map
      var loadMarker = new google.maps.Marker({
        // Get position
        position: new google.maps.LatLng(parseFloat(doc.data().lat), parseFloat(doc.data().lng)),
        map: bmap,
        // Get icon
        icon: doc.data().type
      });
      // Info window for markers on bmap
      loadMarker.addListener("click", function() {
        console.log("Clicked");
        let bName = doc.data().name;
        let bContact = doc.data().contactinfo;
        let bDescription = doc.data().description;
        var businessInfo = new google.maps.InfoWindow({
          content: '<div><h3>' + bName + '</h3><p>Contact me through: ' + bContact + '</p><p><em>' + bDescription + '</em></p></div>'
        });
        businessInfo.open(bmap, loadMarker);
      });
      
      // Load only the markers that belongs to the current user on the main map
      if (doc.data().email === firebase.auth().currentUser.email) {
        var localMarker = new google.maps.Marker({
          // Get position
          position: new google.maps.LatLng(parseFloat(doc.data().lat), parseFloat(doc.data().lng)),
          map: map,
          // Get icon
          icon: doc.data().type
        });
        // Delete on main map
        localMarker.addListener('dblclick', function() {
          console.log(doc.data().lat + "\n" + doc.data().lng);
          fstr.collection("infoinput").doc(doc.data().id).delete();
          localMarker.setMap(null);
        });
        // Infowindow markers loaded on main map
        localMarker.addListener("click", function() {
          console.log("Clicked");
          let lName = doc.data().name;
          let lContact = doc.data().contactinfo;
          let lDescription = doc.data().description;
          var localInfo = new google.maps.InfoWindow({
            content: '<div><h3>' + lName + '</h3><p>Contact me through: ' + lContact + '</p><p><em>' + lDescription + '</em></p></div>'
          });
          localInfo.open(map, localMarker);
        });
      }
    })
  })

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
      console.log(marker.getPosition().lat);
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
      // Spread the array
      infoWindow.open(map, marker);
    });
    // console.log(iconChosen);
    // Submitting backend
    function backendSubmit(backArr) {
      // Get the numbers stored in location.toString using regex
      const getNum = /[-]*\d+.\d+/g;
      // Adding the two numbers to array
      backArr.push(...location.toString().match(getNum));
      // Adding email to array
      backArr.unshift(firebase.auth().currentUser.email);
      // Adding the chosen icon to array
      backArr.push(iconChosen);
      // Turn backArr to an object
      var backObj = {};
      backObj.email = backArr[0];
      backObj.name = backArr[1];
      backObj.description = backArr[2];
      backObj.contactinfo = backArr[3];
      backObj.lat = backArr[4];
      backObj.lng = backArr[5];
      backObj.type = backArr[6]; 
      console.log(backArr);
      console.log(backObj);
      // Object.assign({name: "", description: "", contactinfo: "", lat: "", lng: "", type: "" }, backArr);
      console.log(backObj);
      // Adding the object to Firestore, collection infoinput
      fstr.collection("infoinput").add(backObj)
      .then(function(docRef) {
        // Merge the doc ID onto the data added
        fstr.collection("infoinput").doc(docRef.id).set({
          id: docRef.id
        }, { merge: true });
        console.log("Written with document ID " + docRef.id);
        window.location.reload();
      }).catch(function(error) {
        // Log the error
        console.log("Error: " + error);
      })
    }
    // Submit all the current userdata to firestore database
    document.getElementById("submit-marker").addEventListener("click", function() {
      backendSubmit(infoArr);
      marker.setMap(null);
      /* setTimeout(function() {
        window.location.reload();
      }, 2000);  */
    });
  }
}