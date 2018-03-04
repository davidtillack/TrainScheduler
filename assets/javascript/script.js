$(document).ready(function(){

// Firebase =================================================================================================

var config = {
  apiKey: "AIzaSyDDQZJXzjYA7-LwqTlFcPWtaCWw1okHYgQ",
  authDomain: "my-first-project-937b2.firebaseapp.com",
  databaseURL: "https://my-first-project-937b2.firebaseio.com",
  projectId: "my-first-project-937b2",
  storageBucket: "my-first-project-937b2.appspot.com",
  messagingSenderId: "1081571675944"
};

firebase.initializeApp(config);

var database = firebase.database();

// Set Global Variables =====================================================================================

var trainName = "";
var Destination = "";
var trainTime = "";
var Frequency = "";
var nextArrival = "";
var minutesAway = "";
var array = [];
var time = new Date();

// click function that runs when user clicks search button ==================================================

$("#run-search").click(function(){

  event.preventDefault();
   console.log("TESTSTESTEST");

   trainName = $("#Train-Name").val().trim();
   Destination = $("#Destination").val().trim();
   trainTime = $("#Train-Time").val().trim();
   Frequency = $("#Frequency").val().trim();

   // Push values to Firebase (push used instead of set so that new entries are created)
        database.ref().push({
           trainName: trainName,
           Destination: Destination,
           trainTime: trainTime,
           Frequency: Frequency,
           nextArrival: nextArrival,
           minutesAway: minutesAway,
           dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
   
  // Empty input areas
    $("#Train-Name").val("");
    $("#Destination").val("");
    $("#Train-Time").val("");
    $("#Frequency").val("");
});

// Pull data from Firebase to populate the table ============================================================

database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot) {
	// Storing the snapshot.val() in a variable
  var snapshotValue = snapshot.val();
	console.log(snapshotValue);

	// Setting the variable inputs 
	var tFrequency = snapshotValue.Frequency;
	console.log(tFrequency);

	var firstTime = snapshotValue.trainTime;
	console.log(firstTime);

	// First time pushed back a year to make sure it comes before current time
	var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	// Calculates the current time
	var currentTime = moment();
	console.log("Current Time: " + moment(currentTime).format("hh:mm"));

	// Calculate the difference (in minutes) between current time and first time
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("Difference in Time:" + diffTime);

	// Calculates the time apart remainder
	var tRemainder = diffTime % tFrequency;
	console.log("Remainder:" + tRemainder);

	// Calculates the minutes until the next train arrives
	var minutesAway = tFrequency - tRemainder;
	console.log("Minutes Till Train:" + minutesAway);

	// Calculates the next train's arrival time
	var nextArrival = moment().add(minutesAway, "minutes");
	console.log("Arrival Time: " + moment(nextArrival).format("hh:mm a") + "" + time.toLocaleString('en-US', {hour12:true}));

	// Creates the new table entrys from Firebase
$("#Table-Body > tbody").append("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().Destination + "</td><td>" +
snapshot.val().Frequency + "</td><td>" + moment(nextArrival).format("hh:mm a") + "</td><td>" + minutesAway +"</td></tr>" );

// Display to the user how many trains are arriving in 5 minutes or less ====================================
    if (minutesAway<=5){
        soonTime = minutesAway;
        array.push(soonTime);
        document.getElementById('trainsNear').innerHTML ="There are: " + array.length + " train(s) arriving within 5 minutes!";
        console.log("this is length " + array.length)
        console.log("this is soonTime " + soonTime)
      }
});


// Display User's Time  =====================================================================================

document.getElementById('time').innerHTML ="Your Current Time is: " + time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

 });
