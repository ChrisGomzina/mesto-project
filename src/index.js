import './pages/index.css';

import { buttonEdit,
  buttonAdd,
  profilePopup,
  cardPopup,
  imagePopup,
  buttonCloseProfilePopup,
  buttonCloseCardPopup,
  buttonCloseImagePopup,
  buttonSaveProfilePopup,
  buttonSaveElementPopup,
  nameProfile,
  jobProfile,
  profilePopupForm,
  nameInput,
  jobInput,
  cardPopupForm,
  placeInput,
  imageInput,
  photoImagePopup,
  captionImagePopup,
  elementTemplate,
  elements } from './scripts/components/constants.js';

import { openPopup,
  closePopup,
  keyHandler } from './scripts/components/popup.js'

import { initialElements,
  like,
  renderElement } from './scripts/components/card.js'

import { validationConfig,
  hasInvalidInput,
  isableSubmitButton,
  setSubmitButtonState,
  showInputError,
  hideInputError,
  hideAllErrors,
  isValid,
  setEventListeners,
  enableValidation } from './scripts/components/validate.js';

import { formSubmitHandler } from './scripts/components/popupProfile.js';

initialElements.forEach(function(element) {
  const card = renderElement(element);
  elements.prepend(card);
});

profilePopupForm.addEventListener('submit', formSubmitHandler);

//Ниже реализация добавления карточки из модального окна
cardPopupForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const arreyElement = {
    name: placeInput.value,
    link: imageInput.value,
  };

  placeInput.value = '';
  imageInput.value = '';
  
  elements.prepend(renderElement(arreyElement, elements));
  closePopup(cardPopup);
});

//Открытие и закрытие модального окна с редактированием профиля
buttonEdit.addEventListener ('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(profilePopup);
  hideAllErrors(buttonSaveProfilePopup, validationConfig);
});

buttonCloseProfilePopup.addEventListener ('click', () => {
  closePopup(profilePopup);
});

//Открытие и закрытие модального окна с добавлением карточек
buttonAdd.addEventListener ('click', () => {
  openPopup(cardPopup);
  hideAllErrors(buttonSaveProfilePopup, validationConfig);
  cardPopupForm.reset();
});

buttonCloseCardPopup.addEventListener ('click', () => {
  closePopup(cardPopup);
});

//Закрытие модального окна с изображением
buttonCloseImagePopup.addEventListener ('click', () => {
  closePopup(imagePopup);
});

//Закрытие модального окна по клику на оверлей
document.addEventListener('mousedown', function(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
});

enableValidation(validationConfig);