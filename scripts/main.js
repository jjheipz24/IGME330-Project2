let app = new Vue({
    el: '#root',
    data: {
        link: "https://cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?title=",
        contents: {

        },
        bookName: " ",
        bookHeader: " ",
        bookAuthor: " ",
        bookDescrip: " ",
        bookImgLink: "http://covers.openlibrary.org/b/isbn/",
        bookISBN: "",
        bookPic: " ", //we should probably add a placeholder image that will be shown in the final product
        subjects: [],
        numResults: "",

        styleLoad: {
            display: 'none'
        },
        styleInfo: {
            display: 'none'
        }
    },
    methods: {
        search() {
            //Won't search if nothing added in search bar
            if (this.bookName == " ") {
                return;
            } else {
                //---------ADD LOADING IMAGE HERE-------
                //------------I'D SOMEHOW FIND A WAY TO SET IT EQUAL TO THE BOOKPIC VARIABLE SO THAT IT DISAPPEARS WHEN IT GETS OVERRIDDEN BY THE ACTUAL BOOKPIC---------
                this.styleInfo.display = "none";
                this.styleLoad.display = "block";

                //Changes input to acceptable form to be searched
                this.bookName = this.bookName.toLowerCase();
                this.bookName = this.bookName.replace(/ /g, "+");
                this.link += `${this.bookName}`;

                this.bookName = ""; //clears search bar
                fetch(this.link)
                    .then(response => {
                        if (!response.ok) {
                            throw Error(`ERROR: ${response.statusText}`);

                        }
                        return response.json();
                    })
                    .then(json => {
                        console.log(json);

                        //isolates first result found for book and all of its properties
                        json = json.docs[0];
                        this.contents = json; //sets contents to docs array in JSON file
                        this.setContents();

                        console.log(this.contents);
                        this.link = "https://cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?title=" //resets link to search again
                        
                    });

                    //grab description using details from Books Api
                    fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:9780980200447&jscmd=details&format=json`)
                    .then(response => {
                        if (!response.ok) {
                            throw Error(`ERROR: ${response.statusText}`);

                        }
                        return response.json();
                    })
                    .then(json => {
                        console.log(json);            
                    });
            }
        }, // end search

        setContents() {
            this.bookHeader = this.contents.title; //sets book header to actual title of book
            this.bookAuthor = this.contents.author_name[0]; //sets bookAuthor to the item in [0] of author_names array
            this.bookISBN = this.contents.isbn[0]; //sets isbn of book
            this.bookImgLink += this.bookISBN;
            this.bookImgLink += `-M.jpg`;
            this.bookDescrip = '';
            this.bookPic = this.bookImgLink;
            this.subjects = this.contents.subject;
            console.log(this.subjects);
            this.bookImgLink = "http://covers.openlibrary.org/b/isbn/"; //resets image link to get new image in another search

            this.styleLoad.display = 'none';
            this.styleInfo.display = 'block';
        },

    } // end methods


});
