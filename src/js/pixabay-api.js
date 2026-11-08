import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '58341818-aa4b6b37dc6ab2f989114a374';

export default function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
}
