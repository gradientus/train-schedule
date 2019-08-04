$(document).ready(function() {
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

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  //click submit to be able to add underground line info
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

    //to hold then push the underground line information
    var undObj = {
      train: train,
      destination: destination,
      departure: departure,
      frequency: frequency
    };

    //to push the underground line information
    database.ref().push(undObj);

    //TODO: put a modal in here when there was success with adding the underground line
    //TODO: add a way to clear out the text once it has been added because it lingers
  });

  //to reflect the information in the database in a tr and td elements
  database.ref().on("child_added", function(childSnapshot) {
    var tableTrain = childSnapshot.val().train;
    var tableDest = childSnapshot.val().destination;
    var tableDep = childSnapshot.val().departure;
    var tableFreq = childSnapshot.val().frequency;

    //TODO: use the moment.js thing to convert dates
    //TODO: use math to calculate when the next train arrives
    //TODO: use math to calculate how many minutes away

    $("#scheduleInfo").append(`<tr class="scheduleRow">`);
    $(".scheduleRow").html(`<td>${tableTrain}</td>
    <td>${tableDest}</td>
    <td>${tableFreq}</td><td>17:30</td><td>8</td>`);
    //FIXME: Why are these rows and cells populating so weird???
  });
});
