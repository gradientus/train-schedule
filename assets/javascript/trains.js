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
  // function to clear cell values after submit because they stick around
  function clearValues() {
    $("#train").val("");
    $("#destination").val("");
    $("#departure").val("");
    $("#frequency").val("");
  }

  //
  //event listener declaring variables to hold the information of the most recent child added to the database
  database.ref().on("child_added", function(childSnapshot) {
    var tableTrain = childSnapshot.val().train;
    var tableDest = childSnapshot.val().destination;
    var tableDep = childSnapshot.val().departure; //first time
    var tableFreq = childSnapshot.val().frequency; //frequency

    //
    //variables and math to calculate the next arrival time and how many minutes away the train is
    var now = moment(); //capture current time
    //console.log(now);

    var timeLeave = moment(tableDep, "HH:mm"); //capture the first departure time from Firebase
    //console.log(timeLeave);

    var difference = now.diff(timeLeave, "minutes"); //capture how many minutes between now and Firebase time
    //console.log(difference);

    var mod = difference % tableFreq; //capture the number of minutes between the difference and the frequency
    //console.log(mod);

    var minutesAway = tableFreq - mod;
    //console.log(minutesAway);

    var nextArrival = now.add(minutesAway, "minutes").format("HH:mm");
    //console.log(nextArrival);

    //
    //to append the info from Firebase and the time calculations to the table
    $("#scheduleInfo").append(
      `<tr class="trainRow"><td class="trainCell">${tableTrain}</td><td class="trainCell">${tableDest}</td><td class="trainCell">${tableFreq}</td><td class="trainCell">${nextArrival}</td><td class="trainCell">${minutesAway}</td></tr>`
    );
  });

  //ICEBOX: add a button to delete the last entry
  //ICEBOX: add a button to reset the whole database
});
