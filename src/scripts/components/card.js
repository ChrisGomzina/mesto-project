import { elementTemplate,
  photoImagePopup,
  captionImagePopup,
  imagePopup } from './constants.js';

import { openPopup } from './popup.js';

//Массив для карточек из коробки
// export const initialElements = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ]; 

//Функция лайка карточки
export function like(element) {
  element.classList.toggle('element__button-like_active');
};

//Ниже реализована функция загрузки карточек из массива
export function renderElement(arreyElement) {
  const card = elementTemplate.querySelector('.element').cloneNode(true);
  const photoCard = card.querySelector('.element__photo');
  const titleCard = card.querySelector('.element__title');

  const buttonLike = card.querySelector('.element__button-like');
  const buttonDelete = card.querySelector('.element__trash');

  titleCard.textContent = arreyElement.name;
  photoCard.src = arreyElement.link;
  photoCard.alt = arreyElement.name; 

  //Ниже реализация лайка карточек 
  buttonLike.addEventListener ('click', () => {
    like(buttonLike);
  });

  //Ниже реализация удаления карточки
  buttonDelete.addEventListener('click', () => {
    card.remove();
  });

  //Ниже реализация открытия модального окна с изображением
  photoCard.addEventListener ('click', () => {
    photoImagePopup.src = arreyElement.link;
    photoImagePopup.alt = arreyElement.name;
    captionImagePopup.textContent = arreyElement.name;
    openPopup(imagePopup);
  });

   return card;
}

function createCard(data) {
  const card = elementTemplate.querySelector('.element').cloneNode(true);
  const photoCard = card.querySelector('.element__photo');
  const titleCard = card.querySelector('.element__title');

  const buttonLike = card.querySelector('.element__button-like');
  const buttonDelete = card.querySelector('.element__trash');
  const likeCounter = card.querySelector('.element__like-counter');

  titleCard.textContent = data.name;
  photoCard.src = data.link;
  photoCard.alt = data.name; 
  likeCounter.textContent = data.likes.length;

  
}

function isCardLike(data) {

}

//Функция лайка и изменение количества лайков
function toggleLike(data) {
  const likeCounter = card.querySelector('.element__like-counter');
  const buttonLike = card.querySelector('.element__button-like');
  likeCounter.textContent = data.likes.length;
  buttonLike.classList.toggle('element__button-like_active');
}

//Проверка id для удаления кнопки "удалить" из dom
function hasDeleteButton(data, userId) {
  if (userId !== data.owner._id) {
    const buttonDelete = card.querySelector('.element__trash');
    buttonDelete.remove();
  }
}