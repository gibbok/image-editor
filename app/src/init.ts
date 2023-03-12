import axios from 'axios';
import { API_BASE_URL } from './config';

export const initApp = () => {
  axios.defaults.baseURL = API_BASE_URL;
};
