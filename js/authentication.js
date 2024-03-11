//  firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC5N2hdVrUxwSFaO_CZ_R_tOk9U_il01zo",
  authDomain: "movie-app-fa88c.firebaseapp.com",
  projectId: "movie-app-fa88c",
  storageBucket: "movie-app-fa88c.appspot.com",
  messagingSenderId: "740073435661",
  appId: "1:740073435661:web:12a0c93fca229c6431db44",
  measurementId: "G-NGYMYW7RT2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// register function
function register() {
  // Get all our input fields
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var full_name = document.getElementById("full_name").value;

  // Validate input fields
  if (!validate_email(email)) {
    alert("Email is not valid!");
    return;
  }

  if (!validate_password(password)) {
    alert("Password is not valid!");
    return;
  }

  if (!validate_field(full_name)) {
    alert("Full Name is not valid!");
    return;
  }

  // createuser
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        email: email,
        full_name: full_name,
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).set(user_data);
      // Done
      alert("User Created!!");
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_message = error.message;
      alert(error_message);
    });
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}
function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}
function validate_field(field) {
  if (field == null) {
    return false;
  }
  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
