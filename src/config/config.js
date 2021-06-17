import axios from 'axios';

const API = axios.create({
          baseURL: 'https://yazi-yorums.herokuapp.com'
    //  baseURL: 'http://localhost:4001'
})

export default API;
