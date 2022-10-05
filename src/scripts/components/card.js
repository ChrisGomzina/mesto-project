import { elementTemplate,
  photoImagePopup,
  captionImagePopup,
  imagePopup } from './constants.js';

import { openPopup } from './popup.js';

export function createCard(data) {
  const card = elementTemplate.querySelector('.element').cloneNode(true);
  const photoCard = card.querySelector('.element__photo');
  const titleCard = card.querySelector('.element__title');

  const buttonLike = card.querySelector('.element__button-like');
  const buttonDelete = card.querySelector('.element__trash');
  const likeCounter = card.querySelector('.element__like-counter');

  let cardId = '';
  let userId = '';

  titleCard.textContent = data.name;
  photoCard.src = data.link;
  photoCard.alt = data.name;
  likeCounter.textContent = data.likes.length;
  cardId = data._id;
  userId = data.owner._id;

  hasDeleteButton(data, userId);

  //Слушатель лайка карточек
  buttonLike.addEventListener ('click', () => {
    toggleLike(buttonLike, likeCounter);
  });

  //Ниже реализация удаления карточки
  buttonDelete.addEventListener('click', () => {
    card.remove();
  });

  //Ниже реализация открытия модального окна с изображением
  photoCard.addEventListener ('click', () => {
    photoImagePopup.src = data.link;
    photoImagePopup.alt = data.name;
    captionImagePopup.textContent = data.name;
    openPopup(imagePopup);
  });

  return card;
}

//Функция лайка и изменение количества лайков
function toggleLike(button, counter) {
  if (!button.classList.contains('element__button-like_active')) {
    button.classList.add('element__button-like_active');
    counter.textContent++;
  } else {
    button.classList.remove('element__button-like_active');
    counter.textContent--;
  }
}

//Проверка id для удаления кнопки "удалить" из dom
function hasDeleteButton(data, userId) {
  if (userId !== data.owner._id) {
    const buttonDelete = card.querySelector('.element__trash');
    buttonDelete.remove();
  }
}
