import { Catalog } from "./src/components/catalog.js"

const renderPostItem = item => `
    <a  
        href="post.html?id=${item.id}"
        class="post-item"
    >
        <span class="post-item__title">
            ${item.title}
        </span>

        <span class="post-item__body">
            ${item.body}
        </span>
    </a>
`

const getPostItems = async ({ limit, page }) => {
    try {
        const responsePosts = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
        const total = await responsePosts.headers.get('x-total-count');
        const items = await responsePosts.json();
        return { items, total };
    } catch (e) {
        console.log(e);
    }
}

const renderPhotoItem = item => `
    <a  
        href="photos/${item.id}"
        class="photo-item"
    >
        <span class="photo-item__title">
            ${item.title}
        </span>

        <img 
            src=${item.url}
            class="photo-item__image"
        >
    </a>
`

const getPhotoItems = async ({ limit, page }) => {
    try {
        const responsePhotos = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`);
        const total = await responsePhotos.headers.get('x-total-count');
        const items = await responsePhotos.json();

        return { items, total };
    } catch (e) {
        console.log(e);
    }

}

const init = () => {
    const catalog = document.getElementById('catalog')
    new Catalog(catalog, {
        renderItem: renderPostItem,
        getItems: getPostItems
    }).init()
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}