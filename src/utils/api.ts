import { API_URL_MOVIE } from '@env'
import axios from 'axios';
const apiMovie = axios.create({
    baseURL: API_URL_MOVIE,
    timeout: 1000
  });

export { apiMovie }