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
    
    
    // Get the input values
    var trainName= $("#train-name").val().trim()
    var destination = $("#destination").val().trim()
    var firstTrainTime = $("#first-train").val().trim()
    var frequency = parseInt($("#frequency").val().trim())


    // send data to firebase. use .push to add a new record rather than replacing it with .set()
    ref.push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency



    })

}) 

ref.on("value", function(snapshot) {
    
    var snapshots = snapshot.val()


    // first loop goes thru all records in the database creates a tr for each one at line 53. second loops thru all properties of a single database entry, creates a table column and sets the text for each column
    $.each(snapshots, function(index, childSnapshot){
        
        console.log(childSnapshot)

        var row = $('<tr>')
        $.each(childSnapshot, function(index, property){

            var col = $('<td>')
    
            col.text(property)
    
            row.append(col)
        })

        $('#tableBody').append(row) 
       


        $('#train-name').text()
        $('#destination').text()
        $('#first-train').text()
        $('#frequency').text()
    })
})

