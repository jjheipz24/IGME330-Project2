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

Vue.component('name', {
    props: ['title'],
    template: `<h2>{{ title }}</h2>`
});

Vue.component('letterRating', {
    props: ['rating'],
    template: `<p>{{ rating }}</p>`
});

Vue.component('description', {
    props: ['descrip'],
    template: `<p>{{ descrip }}</p>`
});

Vue.component('numRating', {
    props: ['score'],
    template: `<p class="score">{{ score }}</p>`
});


Vue.component('movie-info', {
    props: ['titles', 'ratings', 'descrips', 'scores'],
    template: `<b-row class="movieSug">
        <name v-for="title in titles" v-bind:title="title"></name> 
        <letterRating v-for="rating in ratings" v-bind:rating="rating"></letterRating>  
        <numRating v-for="score in scores" v-bind:score="score"></numRating>  
        <description v-for="descrip in descrips" v-bind:descrip="descrip"></description>
    </b-row>`
});

Vue.component('movie', {
    props: ['title', 'rating', 'descrip', 'score'],
    template: `<b-row class="movieSug">
<h2>{{ title }}</h2>
<p>{{ rating }}</p>
<p>{{ descrip }}</p>
<p class="score">{{ score }}</p>
</b-row>`
});

//Jin Jin's Thoughts/Pseudo Code: Nested v-for
/*<div id="one" v-for="obj in movieObjects">
<h2 v-for="title in obj.movieTitles">{{title}}</h2>
<p v-for="rating in obj.ratings">{{rating}}</p>
<p class="score" v-for="score in obj.movieScores">{{score}}</p>
<p v-for="descrip in obj.movieDescrips">{{descrip}}</p>
</div>*/


//v-for="title in titles" v-bind:title="title"
//v-for="rating in ratings" v-bind:rating="rating"
//v-for="descrip in descrips" v-bind:descrip="descrip"
