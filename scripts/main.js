//TasteDive access key
//334818-IGME230P-KCLLAGPP

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

        numResults: "",

        styleLoad: {
            display: 'none'
        },
        styleInfo: {
            display: 'none'
        },
        error: {
            display: 'none'
        }
    },
    methods: {
        search() {
            //Won't search if nothing added in search bar
            if (this.bookName == " ") {
                return;
            } else {

                this.styleInfo.display = "none";
                this.styleLoad.display = "block";

                //Changes input to acceptable form to be searched
                this.bookName = this.bookName.toLowerCase();
                this.bookName = this.bookName.replace(/ /g, "+");
                this.bookLink += `${this.bookName}`;
                this.movieSearch(this.bookName);

                this.bookName = ""; //clears search bar
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

                        if (!json.ok) {
                            this.styleLoad.display = 'none';
                            this.styleInfo.display = 'none';
                            this.error.display = 'block';
                        }
                    
                        //thank you Coehl
                        //isolates first result found for book and all of its properties
                        this.bookContents = json.docs[1]; //sets contents to docs array in JSON file
                        console.log(json.docs[1].author_name[0]);
                        this.setContents();


                        this.bookLink = "https://cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?title=" //resets link to search again


                    });


            }
        }, // end search
        movieSearch(name) {
            this.movieLink += `q=${name}&type=movies`;
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

                });

        },

        setContents() {
            this.bookHeader = this.bookContents.title; //sets book header to actual title of book
            this.bookAuthor = this.bookContents.author_name[0]; //sets bookAuthor to the item in [0] of author_names array
            this.bookISBN = this.bookContents.isbn[0]; //sets isbn of book
            this.bookImgLink += this.bookISBN;
            this.bookImgLink += `-L.jpg`;
            this.bookDescrip = '';
            this.bookPic = this.bookImgLink;
            this.subjects = this.bookContents.subject;
            console.log(this.subjects);
            this.bookImgLink = "http://covers.openlibrary.org/b/isbn/"; //resets image link to get new image in another search

            this.styleLoad.display = 'none';
            this.styleInfo.display = 'block';
        }

    } // end methods


});
