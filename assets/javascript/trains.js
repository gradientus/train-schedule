//setup Firebase connection information
var firebaseConfig = {
  apiKey: "AIzaSyDwV6Ai3Eb8YvD_iCDj6QpdQO5vTQE8qhY",
  authDomain: "trainschedule-3055b.firebaseapp.com",
  databaseURL: "https://trainschedule-3055b.firebaseio.com",
  projectId: "trainschedule-3055b",
  storageBucket: "",
  messagingSenderId: "22705671889",
  appId: "1:22705671889:web:6de3806fa99e76ee"
};

//
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

//
//click submit to be able to add underground line info
$("#submit").on("click", function() {
  event.preventDefault();
  let train = $("#train")
    .val()
    .trim();
  let destination = $("#destination")
    .val()
    .trim();
  let departure = $("#departure")
    .val()
    .trim();
  let frequency = $("#frequency")
    .val()
    .trim();

  //
  //to hold then push the underground line information
  var undObj = {
    train: train,
    destination: destination,
    departure: departure,
    frequency: frequency
  };

  //
  //to push the underground line information
  database.ref().push(undObj);

  //
  //to clear the cell values after submit was clicked
  clearValues();
});

//
// function to clear cell values
function clearValues() {
  $("#train").val("");
  $("#destination").val("");
  $("#departure").val("");
  $("#frequency").val("");
}

//
//to reflect the information in the database in a tr and td elements
database.ref().on("child_added", function(childSnapshot) {
  var tableTrain = childSnapshot.val().train;
  var tableDest = childSnapshot.val().destination;
  var tableDep = childSnapshot.val().departure;
  var tableFreq = childSnapshot.val().frequency;

  //
  //to append the info from Firebase to the table
  $("#scheduleInfo").append(
    `<tr class="trainRow"><td class="trainCell">${tableTrain}</td><td class="trainCell">${tableDest}</td><td class="trainCell">${tableFreq}</td><td class="trainCell">14:00</td><td class="trainCell">19</td></tr>`
  );
});

//TODO: wrap everything in .ready overall function
//TODO: use the moment.js thing to convert dates
//TODO: use math to calculate when the next train arrives
//TODO: use math to calculate how many minutes away that is from right now
//TODO: add a button to reset the whole database
