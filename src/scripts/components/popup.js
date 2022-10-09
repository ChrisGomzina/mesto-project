import { popups,
  buttonEdit,
  buttonAdd,
  buttonAvatar,
  nameInput,
  jobInput,
  nameProfile,
  jobProfile,
  profilePopup,
  cardPopup,
  avatarPopup,
  cardPopupForm,
  avatarPopupForm,
  buttonSaveProfilePopup,
  buttonSaveElementPopup,
  buttonSaveAvatarPopup,
  buttonsSave } from './constants.js';

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
    closePopup(activePopup);
  }
}

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

//Функция отображения загрузки
export function loading(form, isLoading, typeSave) {
  const buttonSubmit = form.querySelector('.popup__button-save');
  if(isLoading) {
    buttonSubmit.textContent = 'Сохранение...'
  } else {
    if(typeSave) {
      buttonSubmit.textContent = 'Сохранить';
    } else {
      buttonSubmit.textContent = 'Создать';
    }
  }
}
