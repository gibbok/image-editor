import axios from 'axios';

export const initConfig = () => {
  axios.defaults.baseURL = 'https://picsum.photos/v2/';
};
