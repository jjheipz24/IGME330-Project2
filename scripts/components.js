Vue.component('book-info',{
	props: ['title','author', 'descrip'],
	template: `<div class="text-left">
        <h2 v-bind="title"></h2>
        <img src="bookpic.jpg" class="rounded" id="bookCover" alt="Cover Image">
        </div>
        <div class="info">
        <h3 v-bind="author"></h3>
        <p v-bind="descrip"></p>
        </div>`
});