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
      $("#scheduleInfo").text(
        `${train}    ${destination}    ${departure}   ${frequency}`
      );
    },
    function(errorObject) {
      console.log("Something bad happened: " + errorObject.code);
    }
  );
});
