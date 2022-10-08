import './pages/index.css';

import { buttonEdit,
  buttonAdd,
  buttonAvatar,
  profilePopup,
  cardPopup,
  imagePopup,
  avatarPopup,
  buttonCloseProfilePopup,
  buttonCloseCardPopup,
  buttonCloseImagePopup,
  buttonSaveProfilePopup,
  buttonSaveElementPopup,
  buttonSaveAvatarPopup,
  nameProfile,
  jobProfile,
  avatarProfile,
  profilePopupForm,
  nameInput,
  jobInput,
  cardPopupForm,
  placeInput,
  imageInput,
  avatarPopupForm,
  avatarInput,
  photoImagePopup,
  captionImagePopup,
  elementTemplate,
  elements,
  popups } from './scripts/components/constants.js';

import { openPopup,
  closePopup,
  handleEscapeKey,
  loading } from './scripts/components/popup.js'

import { createCard,
  hasDeleteButton,
  addCardToMarkup,
  hasLikeButton,
  isCardLiked } from './scripts/components/card.js'

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
            data.likes.forEach((like) => isCardLiked(like, userId));
          });
        })

        .catch((err) => {
          console.log(err);
        });
    })

    .catch((err) => {
      console.log(err);
    });
}

getAllData();

//Функция редактирование имени и информации о себе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  editUserInfo(nameInput.value, jobInput.value)
    .then((res) => {
      nameProfile.textContent = nameInput.value;
      jobProfile.textContent = jobInput.value;
      closePopup(profilePopup);
    })

    .catch((err) => {
      console.log(err);
    })

    .finally((res) => {
      loading(false);
    });

    loading(true);
}

profilePopupForm.addEventListener('submit', handleProfileFormSubmit);


//Функция обновления аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  editAvatar(avatarInput.value)
  .then((res) => {
    avatarProfile.src = avatarInput.value;
    closePopup(avatarPopup);
  })

  .catch((err) => {
    console.log(err);
  })

  .finally((res) => {
    loading(false);
  });

  loading(true);
}

avatarPopupForm.addEventListener('submit', handleAvatarFormSubmit);

//Ниже реализация добавления карточки из модального окна
cardPopupForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeInput.value,
    link: imageInput.value,
    likes: []
  };

  addCard(newCard)
  .then((data) => {
    data._id = newCard._id;
    elements.prepend(createCard(newCard));
    closePopup(cardPopup);
  })

  .catch((err) => {
    console.log(err);
  })

  .finally((res) => {
    loading(false);
  });

  loading(true);

  evt.target.reset();
});


//Валидация всех форм
enableValidation(validationConfig);
