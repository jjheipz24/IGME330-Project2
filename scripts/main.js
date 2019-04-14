let app = new Vue({
    el: '#root',
    data: {
        link: "https://cors-anywhere.herokuapp.com/http://openlibrary.org/search.json?title=",
        bookName: " ",
        bookHeader: " ",
        bookAuthor: "Stephen King",
        bookDescrip: "Content",
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
                        //this.data = json;
                    })
            }
        } // end search

    } // end methods

});
