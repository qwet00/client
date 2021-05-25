import axios from 'axios';

const API = axios.create({
      baseURL: 'https://yazi-yorums.herokuapp.com'
})

export default API;
