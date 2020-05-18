var map;
function initMap() {
  // Create center point of map when first acessing the website
  var mainFocus = new google.maps.LatLng(-34.397, 150.644);
  /* Create map options,
  center is the coordinates that the map will switch to 
  on first loading the website, this should be later on
  changed to the current user's coordinates
  zoom is the level of zoom the map will be on when first loaded,
  with 1 = the world map, 15 being street view */
  var mapOptions = {
    center: mainFocus,
    zoom: 8
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
  google.maps.event.addListener(map, 'dblclick', function(event) {
    placeMarker(event.latLng);
  });

  // The placeMarker function definition
  function placeMarker(location) { // the location argument being even.latLng
    // Create a new marker
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      // We could also add custom icons
      icon: iconChosen
    });
    // Center the map around the newly placed marker
    map.setCenter(location);
    console.log(iconChosen);
  }
}
// The default icon value
var iconChosen = "images/brocoli.png";
// Listen for button click
document.getElementById("change").addEventListener("click", function() {
  // Calling the iconCheck function
  // Passing the radio group as an argument
  iconCheck(document.getElementsByName("custom-icon"));
  // Alerting the user that the icon changed
  alert("Icon changed");
});
// Defining the iconCheck function
function iconCheck(icons) {
  // Logging the console for debugging
  console.log("Icon changed!")
  /* Using a for loop, check all the radio buttons in the passed group
  if a button is found to be checked, setting the icon chosen
  to that of the new value */
  for (let i = 1; i < icons.length; i++) {
    if (icons[i].checked) {
      iconChosen = "images/" + icons[i].value + ".png";
    }
  }
  // Logging the console for debugginf
  console.log(iconChosen);
}
// Function to obtain document height
function getDocHeight() {
  var D = document;
  return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
  )
}
// Converting the scrolling progress to percentage
function amountscrolled(){
  // Get the window height
  var winheight= window.innerHeight || (document.documentElement || document.body).clientHeight;
  // Get the document height
  var docheight = getDocHeight();
  // Get the scroll bar top
  var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
  // Track scrolling
  var trackLength = docheight - winheight
  // Converting to percentage
  var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
  // Debug
  console.log(pctScrolled + '% scrolled')
  // Change navbar color
  if (pctScrolled >= 53) {
    document.getElementById("nav-bar").style.backgroundColor = "#5cdb95";
  } else {
    document.getElementById("nav-bar").style.backgroundColor = "#379683";
  }
}
// Calling the function when user scroll
window.addEventListener("scroll", function() {
  amountscrolled()
}, false)
// Adding function to unreleashed products to say they're unreleashed
document.getElementById("coming").addEventListener("click", function() {
  alert("Feature not added yet!")
});