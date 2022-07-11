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
  avatarProfile,
  profilePopupForm,
  nameInput,
  jobInput,
  cardPopupForm,
  placeInput,
  imageInput,
  photoImagePopup,
  captionImagePopup,
  elementTemplate,
  elements,
  popups } from './scripts/components/constants.js';

import { openPopup,
  closePopup,
  handleEscapeKey } from './scripts/components/popup.js'

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

import { handleProfileFormSubmit } from './scripts/components/popupProfile.js';

import { config,
  checkResponse,
  getUserInfo,
  getInitialCards,
  editUserInfo,
  addCard,
  likeCard,
  dislikeCard,
  deleteCard,
  editAvatar,
  getAllData } from './scripts/components/api.js';

  let userId = null;

  getAllData()
  .then(([cards, user]) => {
    nameProfile.textContent = user.name;
    jobProfile.textContent = user.about;
    avatarProfile.src = user.avatar;
    userId = user._id;

    cards.reverse().forEach((data) => {
      renderElement(data, card, userId) //?
    });
  });





initialElements.forEach(function(element) {
  const card = renderElement(element);
  elements.prepend(card);
});

profilePopupForm.addEventListener('submit', handleProfileFormSubmit);

//Ниже реализация добавления карточки из модального окна
cardPopupForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const arreyElement = {
    name: placeInput.value,
    link: imageInput.value,
  };

  evt.target.reset();
  
  elements.prepend(renderElement(arreyElement, elements));
  closePopup(cardPopup);
});

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

enableValidation(validationConfig);