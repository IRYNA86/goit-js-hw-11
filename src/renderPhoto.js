import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25360661-9d832ca480fd7eb90334f4453';

export default class NewApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    async fetchArticles() {
        try {
            const response = await axios.get(`${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
            console.log(response);
            const totalHits = await response.data.totalHits;
            console.log(totalHits);
            const images = await response.data.hits;
            console.log(images);
            
            this.incrementPage();
              
            return images
         
        } catch (error) {
            console.log(error);
        }
    }
        incrementPage() {
            this.page += 1
        }
        resetPage() {
            this.page = 1;
        }
        get query() {
            return this.searchQuery;
        }
        set query(newQuery) {
            this.searchQuery = newQuery;
        }
       }

 