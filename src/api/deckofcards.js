import axios from 'axios';

const KEY = 'op5lf0rk6yun';

export default axios.create({
    baseURL: 'https://deckofcardsapi.com/api/deck/',
    params: {
        key: KEY,
        deck_count: 1,
    }
})