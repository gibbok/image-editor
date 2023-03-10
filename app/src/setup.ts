import axios from 'axios';

export const API_VERSION = 'v2';

export const setupApp = () => {
  axios.defaults.baseURL = 'https://picsum.photos/';
};
