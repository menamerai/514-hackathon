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
  for (let i = 0; i < icons.length; i++) {
    if (icons[i].checked) {
      iconChosen = "images/" + icons[i].value + ".png";
    }
  }
  // Logging the console for debugging
  // console.log(iconChosen);
  // Make the map visible for the user after first submit
  document.getElementById("map").style.display = "block";
  // Scroll to the map after 1s
  setTimeout(function() {
    console.log("Scrolling...");
    document.getElementById("main").scrollIntoView(true);
  }, 1000);
  // Change the instructions to fit
  document.getElementById("des1").innerHTML = "Form completed.";
  document.getElementById("des2").innerHTML = "Double-click on the map to create a new marker.";
}