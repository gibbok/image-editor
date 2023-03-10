import axios from 'axios';

export const setupApp = () => {
  axios.defaults.baseURL = 'https://picsum.photos/v2/';
};
