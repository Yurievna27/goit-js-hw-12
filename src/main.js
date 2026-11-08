import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImagesByQuery from './js/pixabay-api';

import {
  createGallery,
  hideLoader,
  clearGallery,
  showLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector(".form input[type='text']");
const showMoreBtn = document.querySelector('.show-more-btn');

const PER_PAGE = 15;

let query = '';
let page = 1;
let loadedImages = 0;
let isLoading = false;

function checkEndOfCollection(data) {
  const totalImages = Math.min(data.totalHits, 500);

  if (
    loadedImages >= totalImages ||
    data.hits.length < PER_PAGE
  ) {
    hideLoadMoreButton();

    iziToast.info({
      message:
        "We're sorry, but you've reached the end of search results.",
    });
  } else {
    showLoadMoreButton();
  }
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const newQuery = input.value.trim();
  if (newQuery === '' || isLoading) {
    return;
  }

  query = newQuery;
  page = 1;
  loadedImages = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();
  isLoading = true;

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);

    loadedImages += data.hits.length;

    checkEndOfCollection(data);
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again!',
    });
  } finally {
    hideLoader();
    isLoading = false;
  }
});


showMoreBtn.addEventListener('click', async () => {
  if (isLoading || query === '') {
    return;
  }

  hideLoadMoreButton();
  showLoader();
  isLoading = true;

  try {
    const nextPage = page + 1;

    const data = await getImagesByQuery(query, nextPage);

    if (data.hits.length === 0) {
      iziToast.info({
        message:
          "We're sorry, but you've reached the end of search results.",
      });
      return;
    }

    createGallery(data.hits);

    page = nextPage;
    loadedImages += data.hits.length;

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    checkEndOfCollection(data);
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again!',
    });

    showLoadMoreButton();
  } finally {
    hideLoader();
    isLoading = false;
  }
});
