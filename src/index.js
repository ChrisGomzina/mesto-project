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

//Открытие и закрытие модального окна для обновления аватара
buttonAvatar.addEventListener ('click', () => {
  openPopup(avatarPopup);
  hideAllErrors(buttonSaveAvatarPopup, validationConfig);
  avatarPopupForm.reset();
});

export let userId = null;

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
        });
      })

      .catch((err) => {
        console.log(err);
      })

    .catch((err) => {
      console.log(err);
    });

  })

}

getAllData();

//Функция редактирование имени и информации о себе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  loading(profilePopupForm, true, true);

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
      loading(profilePopupForm, false, true);
    });
}

profilePopupForm.addEventListener('submit', handleProfileFormSubmit);


//Функция обновления аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  loading(avatarPopupForm, true, true);

  editAvatar(avatarInput.value)
  .then((res) => {
    avatarProfile.src = avatarInput.value;
    closePopup(avatarPopup);
  })

  .catch((err) => {
    console.log(err);
  })

  .finally((res) => {
    loading(avatarPopupForm, false, true);
  });
}

avatarPopupForm.addEventListener('submit', handleAvatarFormSubmit);

//Ниже реализация добавления карточки из модального окна
cardPopupForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  loading(cardPopupForm, true, true);
  const newCard = {
    name: placeInput.value,
    link: imageInput.value,
    likes: []
  };

  addCard(newCard)
  .then((data) => {
    evt.target.reset();
    elements.prepend(createCard(data));
    closePopup(cardPopup);
  })

  .catch((err) => {
    console.log(err);
  })

  .finally((res) => {
    loading(cardPopupForm, false, false);
  });
});


//Валидация всех форм
enableValidation(validationConfig);
