
//array to hold all searches
let allQueries = [];

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB9rzeXc4ZlRJDIAXSJfxYp4ObIPRLawa8",
    authDomain: "bookwatch-c8fbb.firebaseapp.com",
    databaseURL: "https://bookwatch-c8fbb.firebaseio.com",
    projectId: "bookwatch-c8fbb",
    storageBucket: "bookwatch-c8fbb.appspot.com",
    messagingSenderId: "894052480603"
    };

firebase.initializeApp(config);

//grab ref to database
let database = firebase.database();

//get the search queries and when they're changed 
let ref = database.ref('searchQuery');

firebase.database().ref("searchQuery").on("value", dataChanged);

//interate through the objects and push each search term into an array
function dataChanged(data){
    let obj = data.val();

    for (let key in obj){   // use for..in to interate through object keys
        let row = obj[key];
        allQueries.push(`${row}`);
    }	
}
