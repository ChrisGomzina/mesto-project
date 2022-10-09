import { elementTemplate,
  photoImagePopup,
  captionImagePopup,
  imagePopup,
  elements } from './constants.js';

import { openPopup } from './popup.js';

import { likeCard,
  dislikeCard,
  deleteCard } from './api.js';

import { userId } from '../../index.js'

import { data } from 'autoprefixer';

//Функция создания карточки
export function createCard(data) {
  const card = elementTemplate.querySelector('.element').cloneNode(true);
  const photoCard = card.querySelector('.element__photo');
  const titleCard = card.querySelector('.element__title');

  const buttonLike = card.querySelector('.element__button-like');
  const buttonDelete = card.querySelector('.element__trash');
  const likeCounter = card.querySelector('.element__like-counter');
  const likesArray = data.likes;

  let cardId = '';

  titleCard.textContent = data.name;
  photoCard.src = data.link;
  photoCard.alt = data.name;
  likeCounter.textContent = data.likes.length;
  cardId = data._id;

  //Проверка id для удаления кнопки "удалить" из dom
  if (userId !== data.owner._id) {
    buttonDelete.remove();
  }

  //Проверка id для лайка
  if (likesArray.some(function(data) {
    return data._id === userId;
  })
  ) {
    buttonLike.classList.add('element__button-like_active');
  }

   //Слушатель лайка карточек
  buttonLike.addEventListener ('click', () => {
    toggleLike(buttonLike, likeCounter, cardId);
  });

  //Ниже реализация удаления карточки
  buttonDelete.addEventListener('click', () => {
    handleDeleteCard(card, cardId);
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
function toggleLike(button, counter, id) {
  if (!button.classList.contains('element__button-like_active')) {
    likeCard(id)
    .then((res) => {
      button.classList.add('element__button-like_active');
      counter.textContent++;
    })

    .catch((err) => {
      console.log(err);
    });

  } else {
    dislikeCard(id)
    .then((res) => {
      button.classList.remove('element__button-like_active');
      counter.textContent--;
    })

    .catch((err) => {
      console.log(err);
    });
  }
}

//Удаление карточек
function handleDeleteCard (card, id) {
  deleteCard(id)
  .then((res) => {
    card.remove();
  })

  .catch((err) => {
    console.log(err);
  });
}

//Добавление карточек в разметку
export function addCardToMarkup(card) {
  elements.prepend(createCard(card));
};
