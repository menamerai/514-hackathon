(function() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyClui_Fn0zAVd8UYcCjAQykWdxHs0qLY70",
        authDomain: "map-for-farmer-277509.firebaseapp.com",
        databaseURL: "https://map-for-farmer-277509.firebaseio.com",
        projectId: "map-for-farmer-277509",
        storageBucket: "map-for-farmer-277509.appspot.com",
        messagingSenderId: "1044721332976",
        appId: "1:1044721332976:web:d39365c7df7ac4b1740835",
        measurementId: "G-RW77PVRPKX"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    // Get the login DOM elements
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const loginButton = document.getElementById("submit");
    const signupButton = document.getElementById("signup");
    const logoutButton = document.getElementById("logout");

    // Add login element
    loginButton.addEventListener("click", lo => {
        // Retrieve email and password
        const email = emailField.value;
        const pass = passwordField.value;

        // Signing in
        firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorMessage);
            console.log(errorCode);
            window.alert("Login failed, please try again. Or simply create a new account");
            // Delete password field here
          });
    });
    signupButton.addEventListener("click", si => {
        const email = emailField.value;
        const pass = passwordField.value;

        // Signing up
        firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
            console.log(error.code);
            console.log(error.message);
            window.alert("Signup failed, please try again.")
        })
    });
    logoutButton.addEventListener("click", lout => {
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
    })
    firebase.auth().onAuthStateChanged(function(user) {
        console.log(firebase.auth().currentUser);
        if (user) { // User is signed in
            console.log("Signed in!");
            document.getElementById("logged").style.display = "initial";
            document.getElementById("login").style.display = "none";
        } else {
            console.log("Signed out!");
            document.getElementById("logged").style.display = "none";
            document.getElementById("login").style.display = "initial";
        }
    })
}());