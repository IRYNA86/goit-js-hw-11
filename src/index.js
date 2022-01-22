import './sass/main.scss';
import './css/styles.css';
import LoadMoreBtn from './load-more-btn';
import NewsApiService from './renderPhoto';
import Notiflix from 'notiflix';
import articleOnePhoto from './templates/templatesOnePhoto.hbs';

const refs = {
    searchForm: document.querySelector('.search-form'),
    renderPhoto: document.querySelector('.gallery'),
    // loadMoreBtn: document.querySelector('.showMore')
};
const loadMoreBtn = new LoadMoreBtn({
    selector: '.showMore',
    hidden: true
})
const newApiService = new NewsApiService();
console.log(loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore)

function onSearch(e) {
    e.preventDefault();
    
    newApiService.query = e.currentTarget.searchQuery.value;

    if (newApiService.query === '') {
        {
            Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.")
        };
    } 
    loadMoreBtn.show();
    loadMoreBtn.disable();
    newApiService.resetPage();
    newApiService.fetchArticles().then(images => {
        clearPhotoMarkup();
        appendPhotoMarkup(images);
        loadMoreBtn.enable();
        if (images.length === 0) {
        {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        };
    }
        })
}
function onLoadMore() {
    loadMoreBtn.disable();
    newApiService.fetchArticles().then(images => {
        appendPhotoMarkup(images);
        loadMoreBtn.enable();
         }
        );
}
function appendPhotoMarkup(images) {
    refs.renderPhoto.insertAdjacentHTML('beforeend', articleOnePhoto(images))
}
function clearPhotoMarkup() {
    refs.renderPhoto.innerHTML = '';
}