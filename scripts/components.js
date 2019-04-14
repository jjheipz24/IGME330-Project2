Vue.component('book-title', {
    props: ['title', 'imglink'],
    template: `<div class="text-left">
        <h2>{{title}}</h2>
        <img v-bind:src="imglink" class="rounded" id="bookCover" alt="Cover Image">
</div>`
});

Vue.component('book-info', {
    props: ['author', 'descrip'],
    template: `        <div class="info">
        <h3>{{author}}</h3>
        <p>{{descrip}}</p>
        </div>`
});
