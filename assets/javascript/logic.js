// Initialize Firebase
var config = {
apiKey: "AIzaSyC3jGWSqhJ9c2n1shOJa5-7LCes7b8yYT4",
authDomain: "train-scheduler-fe859.firebaseapp.com",
databaseURL: "https://train-scheduler-fe859.firebaseio.com",
projectId: "train-scheduler-fe859",
storageBucket: "",
messagingSenderId: "936490382158"
};
firebase.initializeApp(config);

var database = firebase.database()
var ref = database.ref()





$('#submit-train').on("click", function(e){
    e.preventDefault();
    
    
    // Get the input values from add train form
    var trainName= $("#train-name").val().trim()
    var destination = $("#destination").val().trim()
    var firstTrainTime = $("#first-train").val().trim()
    var frequency = parseInt($("#frequency").val().trim())


    // send data to firebase. use .push to add a new record rather than replacing it with .set()
    // ref.push({
    //     trainName: trainName,
    //     destination: destination,
    //     firstTrainTime: firstTrainTime,
    //     frequency: frequency



    // })

    var trainData = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    }

    ref.push(trainData)

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");

}) 

ref.on("child_added", function(childSnapshot, prevChildKey) {

  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName
    var destination = childSnapshot.val().destination
    var firstTrainTime = childSnapshot.val().firstTrainTime
    var frequency = childSnapshot.val().frequency


  
    // lines 74-93 are setting up mins away and next arrival times/calculations

    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted.format("HH:mm"));

    var currentTime = moment()
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"))

    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes")
    console.log("DIFFERENCE IN TIME: " + diffTime + 'mins')


    var tRemainder = diffTime % frequency
    console.log("REMAINDER: " + tRemainder);

    
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES AWAY: " + tMinutesTillTrain)
    
    
    var nextArrivalText = moment().add(tMinutesTillTrain, "minutes").format("hh:mm") 
    // var nextArrivalValue = moment().add(tMinutesTillTrain, "minutes") 
    console.log("NEXT ARRIVAL: " + nextArrivalText);



    

  
    

    
    // Add each train's data into the table
    $("#tableBody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>"  + nextArrivalText + "</td><td>" + tMinutesTillTrain);

        // let refreshTimes = setInterval(function(){
        //     nextArrivalText = nextArrivalValue.add(frequency, "minutes").format("hh:mm");
            
        //     console.log(nextArrivalText, tMinutesTillTrain);
        //     $("td:nth-child(4)").text(nextArrivalText)
        //     $("td:nth-child(5)").text(tMinutesTillTrain)
        // }, 3000);

    

}); 


















// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
// ref.on("value", function(snapshot) {
    
//     var snapshots = snapshot.val()


//     // first loop goes thru all records in the database creates a tr for each one at line 53. second loops thru all properties of a single database entry, creates a table column and sets the text for each column
//     $.each(snapshots, function(index, childSnapshot){
        
//         console.log(childSnapshot)

//         var row = $('<tr>')
//         $.each(childSnapshot, function(index, property){

//             var col = $('<td>')
    
//             col.text(property)
    
//             row.append(col)
//         })

//         $('#tableBody').append(row) 
       


//         $('#train-name').text()
//         $('#destination').text()
//         $('#frequency').text()  
//         $('#first-train').text()
//     })
// })

