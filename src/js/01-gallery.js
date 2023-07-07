import { galleryItems } from './gallery-items.js';
// Change code below this line

const imagesContainer = document.querySelector('ul.gallery');

const imagesMarkup = createImagesMarkup(galleryItems);
//створюємо розмітку для відображення картинок
function createImagesMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
  <a class="gallery__link" href="${preview}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`;
    })
    .join('');
}
imagesContainer.insertAdjacentHTML('beforeend', imagesMarkup);

//відслідковуємо кліки по клавіатурі
imagesContainer.addEventListener('click', onImagesContainerClick);

//метод при кліку на картинку
function onImagesContainerClick(event) {
  //прибираємо стандартні дії браузера на відкриття картинки по посиланню на картинку
  event.preventDefault();

  console.dir(event.target.nodeName);
  if (event.target.nodeName != 'IMG') {
    return;
  }

  const instance = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}" width="800" height="600">`,
    {
      onShow: () => {
        window.addEventListener('keydown', lbClose);
      },
      onClose: () => {
        window.removeEventListener('keydown', lbClose);
      },
    }
  );

  function lbClose(e) {
    if (e.code === 'Escape') {
      instance.close();
    }
  }

  instance.show();
}
