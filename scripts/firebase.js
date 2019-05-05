/*let allQueries = []; //array to hold all searches
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

function dataChanged(data) {
    obj = data.val();

    for (let key in obj) { // use for..in to interate through object keys
        let row = obj[key];
        row = row.toLowerCase();
        allQueries.push(`${row}`);
    }

    getCount(allQueries);

}

//iterates through searches and adds a counter to all of the searches to find which ones appear multiple times
function getCount(original) {
    for (let search of original) {
        if (counts[search] == undefined) {
            counts[search] = 1;
        } else {
            counts[search]++;
        }
    }

    filteredSearches = Object.keys(counts); //array of all of the searches (no repeats)

    console.log(filteredSearches);
    for (let k of filteredSearches) {
        console.log(`${k} : ${counts[k]}`);
        numSearches.push(counts[k]);
    }

    console.log(numSearches);
} */



//figure out how to make array of objects that consist of the key and the value
let app = new Vue({
    el: '#admin',
    data: {
        //-------------TABLE DATA--------------------
        allQueries: [], //array to hold all searches
        counts: {}, //object to add searches and counter
        filteredSearches: [], //array of search results without repeats
        numSearches: [], //array to hold the amount each search appeared
        finalArray: [], //array to hold the final formatted search results
        // Initialize Firebase
        config: {
            apiKey: "AIzaSyB9rzeXc4ZlRJDIAXSJfxYp4ObIPRLawa8",
            authDomain: "bookwatch-c8fbb.firebaseapp.com",
            databaseURL: "https://bookwatch-c8fbb.firebaseio.com",
            projectId: "bookwatch-c8fbb",
            storageBucket: "bookwatch-c8fbb.appspot.com",
            messagingSenderId: "894052480603"
        },
        database: '',
        ref: '',
        obj: '',
        row: '',
        line: '',

        //----------------------WORD CLOUD--------------------
        canvas: ' ',
        ctx: '',
        fSize: ' '
    },
    mounted() {
        this.startUp();

    },
    methods: {
        startUp() {
            firebase.initializeApp(this.config);
            this.database = firebase.database();
            this.ref = this.database.ref('searchQuery');
            this.ref.on("value", this.dataChanged);
        },
        dataChanged(data) {
            this.obj = data.val();

            for (let key in this.obj) { // use for..in to interate through object keys
                this.row = this.obj[key];
                this.row = this.row.toLowerCase();
                this.allQueries.push(`${this.row}`);
            }

            this.getCount(this.allQueries);

        },
        //iterates through searches and adds a counter to all of the searches to find which ones appear multiple times
        getCount(original) {
            for (let search of original) {
                if (this.counts[search] == undefined) {
                    this.counts[search] = 1;
                } else {
                    this.counts[search]++;
                }
            }

            this.filteredSearches = Object.keys(this.counts); //array of all of the searches (no repeats)

            for (let k of this.filteredSearches) {
                this.numSearches.push(this.counts[k]);
            }
            this.formatArray();
        },
        //Takes the two arrays and formats the data together to get added to a final array
        formatArray() {
            for (let i = 0; i < this.filteredSearches.length; i++) {
                this.line = `${this.filteredSearches[i]}: ${this.numSearches[i]}`;
                this.finalArray.push(this.line);
            }

            this.wordCloudFormat();
        },
        //----------------------WORD CLOUD------------------------
        wordCloudFormat() {
            this.canvas = document.querySelector("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.filteredSearches.sort(this.sortNumber);

            //changes font size based on the counts value
            //writes each word in a random location on canvas
            for (let i = 0; i < this.numSearches.length; i++) {
                this.fSize = this.counts[this.filteredSearches[i]] * 2;
                this.ctx.font = `${this.fSize}pt Questrial`;
                this.ctx.fillStyle = `rgb(160 - (i * 2), 210 - (i * 2), 241)`;
                this.ctx.textAlign = 'center';
                this.ctx.testBaseline = 'middle';
                this.ctx.fillText(this.filteredSearches[i], this.getRandom(0, 600), this.getRandom(0, 500));
            }


        },
        sortNumber(a, b) {
            return a - b;
        },
        getRandom(min, max) {
            let range = (max - min) + 1
            let randNum = Math.random() * range;
            return randNum;
        }
    }

});
