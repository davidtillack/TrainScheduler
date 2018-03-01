$(document).ready(function(){

$("#run-search").click(function(){
   event.preventDefault();
   
   var trainName = $("#Train-Name").val().trim();
   var destination = $("#Destination").val().trim();
   var trainTime = $("#Train-Time").val().trim();
   var frequency = $("#Frequency").val().trim();

console.log(trainName);

//    trainName.html("#")

});


// Firebase

// var config = {
//     apiKey: "AIzaSyDDQZJXzjYA7-LwqTlFcPWtaCWw1okHYgQ",
//     authDomain: "my-first-project-937b2.firebaseapp.com",
//     databaseURL: "https://my-first-project-937b2.firebaseio.com",
//     projectId: "my-first-project-937b2",
//     storageBucket: "my-first-project-937b2.appspot.com",
//     messagingSenderId: "1081571675944"
//   };

//   firebase.initializeApp(config);



 });