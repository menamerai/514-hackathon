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
  function amountscrolled() {
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
    // console.log(pctScrolled + '% scrolled')
    // Change navbar color
    if (pctScrolled >= 34 && pctScrolled <= 70) {
      document.getElementById("nav-bar").style.backgroundColor = "#5cdb95";
    } else {
      document.getElementById("nav-bar").style.backgroundColor = "#379683";
    }
  }
  // Calling the function when user scroll
  window.addEventListener("scroll", function() {
    amountscrolled()
  }, false)