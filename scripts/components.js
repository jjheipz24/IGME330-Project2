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

Vue.component('one-movie', {
    props: ['title', 'rating', 'descrip', 'score'],
    template: 
    `<div id="one">
        <h2>{{ title }}</h2>
        <p>{{ rating }}</p>
        <p class="score">{{ score }}</p>
        <p>{{ descrip }}</p>
    </div>`
});

Vue.component('movie-info', {
    props: ['titles', 'ratings', 'descrips', 'scores'],
    template: 
    `<b-row class="movieSug">
        <one-movie v-for="title in titles" v-bind:title="title" v-for="rating in ratings" v-bind:rating="rating"  v-for="score in scores" v-bind:score="score"  v-for="descrip in descrips" v-bind:descrip="descrip"></one-movie>
    </b-row>`
});

//v-for="title in titles" v-bind:title="title"
//v-for="rating in ratings" v-bind:rating="rating"
//v-for="descrip in descrips" v-bind:descrip="descrip"

