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



Vue.component('movie', {
    props: ['title', 'rating', 'descrip', 'score'],
    template: `<b-row class="movieSug">
<h2>{{ title }}</h2>
<p>{{ rating }}</p><p class="score">{{ score }}</p>
<p>{{ descrip }}</p>
</b-row>`
});
