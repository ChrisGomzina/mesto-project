import { popups,
  buttonEdit,
  buttonAdd,
  nameInput,
  jobInput,
  nameProfile,
  jobProfile,
  profilePopup,
  cardPopup,
  cardPopupForm,
  buttonSaveProfilePopup,
  buttonSaveElementPopup } from './constants.js';

import {
  validationConfig,
  hideAllErrors } from './validate.js';

//Функция открытия мадального окна
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKey);
}

//Функция закрытия мадального окна
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

//Закрытие модального окна кнопкой escape
export function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) {
      closePopup(activePopup);
    }
  }
};

//Закрытие модальных окон по клику на оверлей и кнопку закрытия
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    };
  });
});

//Открытие и закрытие модального окна с редактированием профиля
buttonEdit.addEventListener ('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(profilePopup);
  hideAllErrors(buttonSaveProfilePopup, validationConfig);
});

//Открытие и закрытие модального окна с добавлением карточек
buttonAdd.addEventListener ('click', () => {
  openPopup(cardPopup);
  hideAllErrors(buttonSaveElementPopup, validationConfig);
  cardPopupForm.reset();
});
