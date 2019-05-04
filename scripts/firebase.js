let allQueries = []; //array to hold all searches
let counts = {}; //object to add searches and counter
let filteredSearches = []; //array of search results without repeats
let numSearches = [] //array to hold the amount each search appeared



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



//figure out how to make array of objects that consist of the key and the value

let app = new Vue({
    el: '#root',
    data: {

        filteredResults: ' ',
        timesSearched: ' ',
        allQueries: [], //array to hold all searches
        counts: {}, //object to add searches and counter
        filteredSearches: [], //array of search results without repeats
        numSearches: [], //array to hold the amount each search appeared
        obj: {}

    },
    methods: {
        //interate through the objects and push each search term into an array
        function dataChanged(data) {
            obj = data.val();

            for (let key in obj) { // use for..in to interate through object keys
                let row = obj[key];
                row = row.toLowerCase();
                this.allQueries.push(`${row}`);
            }

            getCount(allQueries);

        },

        //iterates through searches and adds a counter to all of the searches to find which ones appear multiple times
        function getCount(original) {
            for (let search of original) {
                if (counts[search] == undefined) {
                    counts[search] = 1;
                } else {
                    counts[search]++;
                }
            },

            filteredSearches = Object.keys(counts); //array of all of the searches (no repeats)

            console.log(filteredSearches);
            for (let k of filteredSearches) {
                console.log(`${k} : ${counts[k]}`);
                numSearches.push(counts[k]);
            }

            console.log(numSearches);
        }
    },

    beforeMount() {
        this.addSearches();
    }
});
