import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImagesByQuery from './js/pixabay-api';

import {
  createGallery,
  hideLoader,
  clearGallery,
  showLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector(".form input[type='text']");

form.addEventListener('submit', e => {
  e.preventDefault();
  const query = input.value.trim();
  if (query === '') {
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      createGallery(data.hits);
    })
    .catch(error => {
      iziToast.error({
        message:
          'Something went wrong. Please try again!',
      });
    })
    .finally(() => {
      hideLoader();
    });
});
