const firebaseConfig = {
  apiKey: "AIzaSyCWruOkOTRLDk8MlXjaVokHtkd8lZfqpjc",
  authDomain: "chat-80e5a.firebaseapp.com",
  projectId: "chat-80e5a",
  storageBucket: "chat-80e5a.appspot.com",
  messagingSenderId: "930803567468",
  appId: "1:930803567468:web:3c4a54c28d19c5727bc149",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let myName = prompt("Please enter your name:");
console.log("Hello, " + myName + "!");

function sendMessage() {
  // get message
  var YourMessage = document.getElementById("message").value;
  // save in database
  firebase.database().ref("messages").push().set({
    sender: myName,
    message: YourMessage,
  });
  // prevent form from submitting
  return false;
}
