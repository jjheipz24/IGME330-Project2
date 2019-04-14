let app = new Vue({
    el: '#root',
    data: {
        link: "https://cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?title=",
        list: {

        },
        bookName: " ",
        bookHeader: " ",
        bookAuthor: "Stephen King",
        bookDescrip: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        bookPic: "../bookpic.jpg",
        numResults: ""
    },
    methods: {
        search() {
            //if (! this.term.trim()) return;
            //            if (this.bookName == " " || this.numResults == "") {
            if (this.bookName == " ") {
                return;
            } else {
                this.bookHeader = this.bookName;
                this.bookName = this.bookName.toLowerCase();
                this.bookName = this.bookName.replace(/ /g, "+");
                this.link += `${this.bookName}`;
                //                        console.log(this.bookName);
                //                        console.log(this.link);
                this.bookName = "";
                fetch(this.link)
                    .then(response => {
                        if (!response.ok) {
                            throw Error(`ERROR: ${response.statusText}`);

                        }
                        return response.json();
                    })
                    .then(json => {
                        console.log(json);
                        json = json.docs[0]
                        this.list = json;
                    })
            }
        } // end search

    } // end methods


});
