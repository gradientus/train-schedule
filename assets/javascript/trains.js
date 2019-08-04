$(document).ready(function() {
  var firebaseConfig = {
    apiKey: "AIzaSyDwV6Ai3Eb8YvD_iCDj6QpdQO5vTQE8qhY",
    authDomain: "trainschedule-3055b.firebaseapp.com",
    databaseURL: "https://trainschedule-3055b.firebaseio.com",
    projectId: "trainschedule-3055b",
    storageBucket: "",
    messagingSenderId: "22705671889",
    appId: "1:22705671889:web:6de3806fa99e76ee"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  //when the user clicks the submit button it grabs the values in the input fields

  //add location in database other than root
  //var trainsRef = database.ref("/trains");
  //this might change to trainsRef.on

  $("#submit").on("click", function() {
    event.preventDefault();
    var train = $("#train")
      .val()
      .trim();
    var destination = $("#destination")
      .val()
      .trim();
    var departure = $("#departure")
      .val()
      .trim();
    var frequency = $("#frequency")
      .val()
      .trim();

    //TODO: create object to hold train information

    //push that object to the database
    database.ref().set({
      train: train,
      destination: destination,
      departure: departure,
      frequency: frequency
    });
  });

  database.ref().on(
    "value",
    function(snapshot) {
      console.log(snapshot.val());
      train = snapshot.val().train;
      destination = snapshot.val().destination;
      departure = snapshot.val().departure;
      frequency = snapshot.val().frequency;
      $("#scheduleInfo").html(
        `<tr>
          <td>${train}</td>
          <td>${destination}</td>
          <td>${frequency}</td>
          <td>12:45</td>
          <td>18</td>`
      );
    },
    function(errorObject) {
      console.log("Something bad happened.  Fix it! " + errorObject.code);
    }
  );
});

//TODO: add a new storage location other than root

//TODO: add information to database
//HERE IS EXAMPLE CODE
// database.ref().on("child_added", function(childSnapshot) {
//   console.log(childSnapshot.val());

// Store everything into a variable.
// var train = childSnapshot.val().name;
// var empRole = childSnapshot.val().role;
// var empStart = childSnapshot.val().start;
// var empRate = childSnapshot.val().rate;

// // Employee Info
// console.log(empName);
// console.log(empRole);
// console.log(empStart);
// console.log(empRate);

//TODO: make all the returned data into elements with attributes
//TODO: append those elements to the table

//TODO: use the moment.js thing to convert dates
//TODO: use math to calculate when the next train arrives etc
//TODO: look at MOMENTJS and TrainPrediction activities
