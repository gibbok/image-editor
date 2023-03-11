import axios from 'axios';

const API_BASE_URL = 'https://picsum.photos/';
export const API_VERSION = 'v2';

export const LIST_THUMBNAIL_WIDTH = 250;
export const LIST_THUMBNAIL_HEIGHT = 166;

export const EDITOR_PREVIEW_INIT_WIDTH = 800;
export const EDITOR_PREVIEW_INIT_HEIGHT = 600;

export const configApp = () => {
  axios.defaults.baseURL = API_BASE_URL;
};
