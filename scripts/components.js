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
    props: ['titles', 'ratings', 'descrips'],
    template: `<b-row class="movieSug">
        <b-col class="text-left">
            <h2>{{titles}}</h2>
            <p>{{ratings}}</p>
            <p>{{descrips}}</p>
        </b-col>
        </b-row>`
});

//v-for="title in titles" v-bind:title="title"
//v-for="rating in ratings" v-bind:rating="rating"
//v-for="descrip in descrips" v-bind:descrip="descrip"

