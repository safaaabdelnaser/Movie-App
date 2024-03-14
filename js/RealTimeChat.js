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
var userDataString = localStorage.getItem("currentUser");
if (userDataString) {
  var userData = JSON.parse(userDataString);
  var myName = userData.full_name;
  console.log(userData.email);
} else {
  console.log("User data not found in localStorage");
}
function sendMessage(event) {
  event.preventDefault();
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
firebase
  .database()
  .ref("messages")
  .on("child_added", function (snapshot) {
    var html = "";
    // give each message a unique ID
    html += "<li id='message-" + snapshot.key + "'>";
    // show delete button if message is sent by me
    html += "<h5>" + snapshot.val().sender + "</h5>" + snapshot.val().message;
    // show delete button if message is sent by me
    if (snapshot.val().sender == myName) {
      html +=
        "<button data-id='" +
        snapshot.key +
        "' onclick='deleteMessage(this);'>";
      html += "<img src='../assets/images/delete.png' width='20'/>";
      html += "</button>";
    }
    html += "</li>";
    document.getElementById("messages").innerHTML += html;
    document.getElementById("message").value = "";
  });
// to delete messages
function deleteMessage(self) {
  // get message ID
  var messageId = self.getAttribute("data-id");
  // delete message
  firebase.database().ref("messages").child(messageId).remove();
}
// attach listener for delete message
firebase
  .database()
  .ref("messages")
  .on("child_removed", function (snapshot) {
    // remove message
    document.getElementById("message-" + snapshot.key).innerHTML =
      "This message has been removed";
  });
