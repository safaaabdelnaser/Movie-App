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
