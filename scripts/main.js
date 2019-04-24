//TasteDive access key
//334818-IGME230P-KCLLAGPP
//OMBD api key: 1c34b0e6

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
        bookPic: " ", //we should probably add a placeholder image that will be shown in the final product
        subjects: [],

        //--------------------MOVIE CONTENT-----------------
        movieContents: {

        },
        movieLink: "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?k=334818-IGME230P-KCLLAGPP&",
        movieInfoLink: "https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=1c34b0e6&",
        movieTitles: [],
        ratings: [],
        movieDescrips: [],
        movieScores: [],
        movieInfoContents: {

        },

        numResults: "",

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

                //Changes input to acceptable form to be searched
                this.bookName = this.bookName.toLowerCase();
                this.bookName = this.bookName.replace(/ /g, "+");
                this.bookLink += `${this.bookName}`;
                
                this.movieSearch(this.bookName, this.selected);

                //this.bookName = " "; //clears search bar
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
                        console.log(json);

                        if (json.docs[0] == undefined) {
                            this.styleLoad.display = 'none';
                            this.styleInfo.display = 'none';
                            this.error.display = 'block';

                            return;
                        }

                        //thank you Coehl
                        //isolates first result found for book and all of its properties
                        this.bookContents = json.docs[0]; //sets contents to docs array in JSON file
                        console.log(json.docs[0].author_name[0]);
                        this.setContents();


                        this.bookLink = "https://cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?title=" //resets link to search again
                        this.movieLink = "https://cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?title=" //resets link to search again    
                    });
            }
        }, // end search
        movieSearch(name, limit) {
            this.movieLink += `q=${name}&type=movies&limit=${limit}`;
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

                    console.log(json);
                    this.movieContents = json;
                    this.setMovieContents();
                });

        },

        movieInfo(name) {
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

                    console.log(json);
                    this.movieInfoContents = json;
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
            console.log(this.subjects);
            this.bookImgLink = "http://covers.openlibrary.org/b/isbn/"; //resets image link to get new image in another search

            this.styleLoad.display = 'none';
            this.styleInfo.display = 'block';
        },

        setMovieContents() {
            console.log(this.movieContents.Similar);

            for(let i = 0; i < limit; i++){
                this.movieTitles.push(this.movieContents.Similar.Results[i].Name);
                this.movieInfo(this.movieContents.Similar.Results[i].Name);
            }

        },

        getMovieInfo() {

            this.ratings.push(this.movieInfoContents.Rated);
            this.movieDescrips.push(this.movieInfoContents.Plot);
            this.movieScores.push(movieInfoContents.Ratings[0].Value);
        }

    } // end methods


});

//http://www.omdbapi.com/?apikey=1c34b0e6&t=%22twilight%22
//https://tastedive.com/read/api

