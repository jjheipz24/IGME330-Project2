Vue.component('book-info', {
    props: ['title', 'author', 'descrip', 'imglink'],
    template: `<div class="text-left">
        <h2>{{title}}</h2>
        <img v-bind:src="imglink" class="rounded" id="bookCover" alt="Cover Image">
        </div>
        <div class="info">
        <h3>{{author}}</h3>
        <p>{{descrip}}</p>
        </div>`
});
