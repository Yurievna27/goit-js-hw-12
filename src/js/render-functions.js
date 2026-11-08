import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const 

const slb = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(image => {
      return `<li class="gallery-item">
    <a class="gallery-link" href="${image.largeImageURL}">
      <img
        class="gallery-image"
        src="${image.webformatURL}"
        alt="${image.tags}"
      />
    </a>
    <div class="image-info">
      <p><b>Likes</b><span>${image.likes}</span></p>
      <p><b>Views</b><span>${image.views}</span></p>
      <p><b>Comments</b><span>${image.comments}</span></p>
      <p><b>Downloads</b><span>${image.downloads}</span></p>
    </div>
  </li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  slb.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}
export function showLoader() {
  loader.classList.remove('hidden');
}
export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loader.classList.add('hidden');
}
