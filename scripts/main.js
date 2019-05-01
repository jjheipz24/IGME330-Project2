//TasteDive access key
//334818-IGME230P-KCLLAGPP
//OMBD api key: 1c34b0e6

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

let database = firebase.database();

let ref = database.ref('searchQuery');

//create VUE app
let app = new Vue({
    el: '#root',
    data: {
        //-------------------BOOK CONTENT----------------
        bookLink: "https://cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?title=",
        bookContents: {

        },
        bookName: " ",
        bookHeader: " ",
        bookAuthor: " ",
        bookDescrip: " ",
        bookImgLink: "http://covers.openlibrary.org/b/isbn/",
        bookISBN: "",
        bookPic: " ",
        subjects: [],

        //--------------------MOVIE CONTENT-----------------
        movieContents: {

        },
        movieLink: "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=334818-IGME230P-KCLLAGPP&", //grabs movies similar to book 
        movieInfoLink: "https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=1c34b0e6&", //grabs the info for each similar movie
        movieInfoContents: {

        },
        //holds every movie object created
        movieObjects: [],

        numResults: "",

        //changes the style of the book field, spinner, and error messages when needed throughout the program
        styleLoad: {
            display: 'none'
        },
        styleInfo: {
            display: 'none'
        },
        error: {
            display: 'none'
        },

        //--------------USER INPUT--------------------
        //this is for how many movie suggestions are shown
        selected: 5,
        options: [
            {
                value: 5,
                text: '5'
            },
            {
                value: 10,
                text: '10'
            },
            {
                value: 15,
                text: '15'
            }
        ]
    },
    //bless this tutorial//
    //https://vuejs.org/v2/cookbook/client-side-storage.html//
    mounted() {
        if (localStorage.bookName) {
            //save the last searched for book on refresh
            this.bookName = localStorage.bookName;
        }
    },
    methods: {
        search() {
            //Won't search if nothing added in search bar
            if (this.bookName == undefined) {
                return;
            } else {
                //set bookname to local storage on search
                localStorage.bookName = this.bookName;

                //show the spinner while search is running
                this.styleInfo.display = "none";
                this.styleLoad.display = "block";

                //pushes successful search term to firebase
                ref.push(this.bookName);

                //Changes input to acceptable form to be searched
                this.bookName = this.bookName.toLowerCase();
                this.bookName = this.bookName.replace(/ /g, "+");
                this.bookLink += `${this.bookName}`;

                this.movieSearch(this.bookName);

                this.bookName = " "; //clears search bar
                fetch(this.bookLink)
                    .then(response => {
                        if (!response.ok) {
                            throw Error(
                                `ERROR: ${response.statusText}`
                            );
                        }
                        return response.json();
                    })
                    .then(json => {
                        //console.log(json);

                        //if json is undefined, show an error message
                        if (json.docs[0] == undefined) {
                            this.styleLoad.display = 'none';
                            this.styleInfo.display = 'none';
                            this.error.display = 'block';

                            return;
                        }

                        //thank you Coehl
                        //isolates first result found for book and all of its properties
                        this.bookContents = json.docs[0]; //sets contents to docs array in JSON file

                        this.setContents();


                        this.bookLink = "https://cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?title=" //resets link to search again
                        this.movieLink = "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=334818-IGME230P-KCLLAGPP&" //resets link to search again
                    });
            }
        }, // end search
        movieSearch(name) {
            //searches for movies similar to the book title and limited by how many the user wants (5/10/15)
            this.movieLink += `q=${name}&type=movies&limit=${this.selected}`;
            fetch(this.movieLink)
                .then(response => {
                    if (!response.ok) {
                        throw Error(
                            `ERROR: ${response.statusText}`
                        );
                    }
                    return response.json();
                })
                .then(json => {

                    //grab all the similar returned movie objects and sent them to set movie contents
                    this.movieContents = json.Similar.Results;

                    this.setMovieContents();

                    this.movieObjects = []; //empties array of movies
                });

        },

        movieInfo(name) {

            //search for that specific movie name
            this.movieInfoLink += `t=${name}`;
            fetch(this.movieInfoLink)
                .then(response => {
                    if (!response.ok) {
                        throw Error(
                            `ERROR: ${response.statusText}`
                        );
                    }
                    return response.json();
                })
                .then(json => {

                    //set movieInfoContents to the json returned
                    this.movieInfoContents = json;

                    //grab the info for each movie
                    this.getMovieInfo();

                    this.movieInfoLink = "http://www.omdbapi.com/?apikey=1c34b0e6&" //resets link to search again

                });
        },

        setContents() {
            this.bookHeader = this.bookContents.title; //sets book header to actual title of book
            this.bookAuthor = this.bookContents.author_name[0]; //sets bookAuthor to the item in [0] of author_names array
            this.bookISBN = this.bookContents.isbn[0]; //sets isbn of book
            this.bookImgLink += this.bookISBN;
            this.bookImgLink += `-M.jpg`;
            this.bookDescrip = '';
            this.bookPic = this.bookImgLink;
            this.subjects = this.bookContents.subject;
            //console.log(this.subjects);
            this.bookImgLink = "http://covers.openlibrary.org/b/isbn/"; //resets image link to get new image in another search

            this.styleLoad.display = 'none';
            this.styleInfo.display = 'block';
        },

        setMovieContents() {
            for (let i = 0; i < this.selected; i++) {
                //call movieInfo for each movie passed back
                this.movieInfo(this.movieContents[i].Name);

                //reset movieInfoLink
                this.movieInfoLink = "https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=1c34b0e6&";
            }

        },

        getMovieInfo() {
            let check = this.movieInfoContents.Response;

            // This checks ensures that no wonky movies sneak through the cracks with BAD DATA 
            //thank you Coehl ^
            if (check != "False") {

                this.AddMovieClass(this.movieInfoContents.Title, this.movieInfoContents.Rated, this.movieInfoContents.Plot, this.movieInfoContents.Ratings[0].Value);

            }
        },

        //creates a movie object for each suggested movie;
        AddMovieClass(title, rating, descrip, score) {
            this.movieObjects.push(new Movie(title, rating, descrip, score));

        }

    } // end methods


});

//http://www.omdbapi.com/?apikey=1c34b0e6&t=%22twilight%22
//https://tastedive.com/read/api
