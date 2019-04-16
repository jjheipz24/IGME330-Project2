Vue.component('book-title', {
    props: ['title', 'imglink'],
    template: `<div class="text-center">
        <h2>{{title}}</h2>
        <img v-bind:src="imglink" class="rounded" id="bookCover" alt="Cover Image">
</div>`
});

Vue.component('book-info', {
    props: ['author', 'descrip'],
    template: `<div class="info text-center">
        <h3>{{author}}</h3>
        </div>`
});

Vue.component('movie-info', {
    props: ['movieimg', 'title', 'rating', 'descrip'],
    template: `<b-row class="movieSug">
        <b-col cols="2" class="text-center">
            <img v-bind:src="movieimg" alt="movie poster" class="movieIMG rounded">
        </b-col>
        <b-col class="text-left">
            <h2>{{title}}</h2>
            <p>{{rating}}</p>
            <p>{{descrip}}</p>
        </b-col>
        </b-row>`
});
