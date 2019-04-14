let app = new Vue({
    el: '#root',
    data: {
        link: "https://cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?title=",
        contents: {

        },
        bookName: " ",
        bookHeader: " ",
        bookAuthor: " ",
        bookDescrip: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        bookImgLink: "http://covers.openlibrary.org/b/isbn/",
        bookISBN: "",
        bookPic: "../bookpic.jpg",
        numResults: ""
    },
    methods: {
        search() {

            //Won't search if nothing added in search bar
            if (this.bookName == " ") {
                return;
            } else {
                this.bookHeader = this.bookName; //sets book header to original query
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
                    })
            }
        }, // end search

        setContents() {
            this.bookAuthor = this.contents.author_name[0]; //sets bookAuthor to the item in [0] of author_names array
            this.bookISBN = this.contents.isbn[0]; //sets isbn of book
            this.bookImgLink += this.bookISBN;
            this.bookImgLink += `-M.jpg`;
            this.bookPic = this.bookImgLink;

        }

    } // end methods


});
