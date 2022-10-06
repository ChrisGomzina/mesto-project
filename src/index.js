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

import { createCard,
  hasDeleteButton,
  addCardToMarkup } from './scripts/components/card.js'

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
  editAvatar } from './scripts/components/api.js';

let userId = null;

//Получение данных пользователя и картинок с сервера
function getAllData() {
  getUserInfo()
    .then((data) => {
      nameProfile.textContent = data.name;
      jobProfile.textContent = data.about;
      avatarProfile.src = data.avatar;
      userId = data._id;

      getInitialCards()
        .then((data) => {
          data.reverse().forEach((data) => {
            addCardToMarkup(data);
            hasDeleteButton(data, userId);
          });
        })

        .catch((err) => {
          console.log(err);
        });
    })

    .catch((err) => {
      console.log(err);
    });
};

getAllData();

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


enableValidation(validationConfig);
