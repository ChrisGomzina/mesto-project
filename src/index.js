import './pages/index.css';

import Api from './scripts/components/Api.js';
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import Popup from './scripts/components/Popup.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Section from './scripts/components/Section.js';
import UserInfo from './scripts/components/UserInfo.js';

import { profilePopupForm,
  cardPopupForm,
  avatarPopupForm,
  validationConfig } from './scripts/utils/constants.js';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    'content-type': 'application/json',
    'authorization': '9cfce386-84bd-41a8-ae69-e779d7b6a47d'
  }
});

let userId = null;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

const userInfo = new UserInfo({
  userName: '.profile__name',
  userInfo: '.profile__job',
  userAvatar: '.profile__avatar'
});

const generateCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: '#element-template',
    userId: userId,
    handleCardClick: (name, link) => {
      viewImagePopup.open(name, link);
    },
    handleDeleteCard: (cardId) => {
      api.deleteCard(cardId)
        .then(() => {
          card.deleteCard();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    setLike: (cardId) => {
      api.likeCard(cardId)
      .then((data) => {
        card.toggleLike(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    },
    removeLike: () => {
      api.dislikeCard(cardId)
        .then((data) => {
         card.toggleLike(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
         });
    }
  });
  const cardElement = card.createCard();
  return cardElement;
};

const cardsList = new Section({
  renderer: (card) => {cardsList.addItem(generateCard(card));},
},'.elements');

const viewImagePopup = new PopupWithImage('.popup_photo');
viewImagePopup.setEventListeners();

//Валидация формы модального окна с редактированием профиля
const profilePopupFormValidate = new FormValidator(validationConfig, profilePopupForm);
profilePopupFormValidate.enableValidation();

//Валидация формы модального окна с добавлением карточек
const cardPopupFormValidate = new FormValidator(validationConfig, cardPopupForm);
cardPopupFormValidate.enableValidation();

//Валидация формы обновления аватара
const avatarPopupFormValidate = new FormValidator(validationConfig, avatarPopupForm);
avatarPopupFormValidate.enableValidation();





// //Открытие и закрытие модального окна с редактированием профиля
// buttonEdit.addEventListener ('click', () => {
//   nameInput.value = nameProfile.textContent;
//   jobInput.value = jobProfile.textContent;
//   openPopup(profilePopup);
//   hideAllErrors(buttonSaveProfilePopup, validationConfig);
// });

// //Открытие и закрытие модального окна с добавлением карточек
// buttonAdd.addEventListener ('click', () => {
//   openPopup(cardPopup);
//   hideAllErrors(buttonSaveElementPopup, validationConfig);
//   cardPopupForm.reset();
// });

// //Открытие и закрытие модального окна для обновления аватара
// buttonAvatar.addEventListener ('click', () => {
//   openPopup(avatarPopup);
//   hideAllErrors(buttonSaveAvatarPopup, validationConfig);
//   avatarPopupForm.reset();
// });

// export let userId = null;

// //Получение данных пользователя и картинок с сервера
// function getAllData() {
//   getUserInfo()
//     .then((data) => {
//       nameProfile.textContent = data.name;
//       jobProfile.textContent = data.about;
//       avatarProfile.src = data.avatar;
//       userId = data._id;

//       getInitialCards()
//       .then((data) => {
//         data.reverse().forEach((data) => {
//           addCardToMarkup(data);
//         });
//       })

//       .catch((err) => {
//         console.log(err);
//       })

//     .catch((err) => {
//       console.log(err);
//     });

//   })

// }

// getAllData();

// //Функция редактирование имени и информации о себе
// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   loading(profilePopupForm, true, true);

//   editUserInfo(nameInput.value, jobInput.value)
//     .then((res) => {
//       nameProfile.textContent = nameInput.value;
//       jobProfile.textContent = jobInput.value;
//       closePopup(profilePopup);
//     })

//     .catch((err) => {
//       console.log(err);
//     })

//     .finally((res) => {
//       loading(profilePopupForm, false, true);
//     });
// }

// profilePopupForm.addEventListener('submit', handleProfileFormSubmit);


// //Функция обновления аватара
// function handleAvatarFormSubmit(evt) {
//   evt.preventDefault();
//   loading(avatarPopupForm, true, true);

//   editAvatar(avatarInput.value)
//   .then((res) => {
//     avatarProfile.src = avatarInput.value;
//     closePopup(avatarPopup);
//   })

//   .catch((err) => {
//     console.log(err);
//   })

//   .finally((res) => {
//     loading(avatarPopupForm, false, true);
//   });
// }

// avatarPopupForm.addEventListener('submit', handleAvatarFormSubmit);

// //Ниже реализация добавления карточки из модального окна
// cardPopupForm.addEventListener('submit', function(evt) {
//   evt.preventDefault();
//   loading(cardPopupForm, true, true);
//   const newCard = {
//     name: placeInput.value,
//     link: imageInput.value,
//     likes: []
//   };

//   addCard(newCard)
//   .then((data) => {
//     evt.target.reset();
//     elements.prepend(createCard(data));
//     closePopup(cardPopup);
//   })

//   .catch((err) => {
//     console.log(err);
//   })

//   .finally((res) => {
//     loading(cardPopupForm, false, false);
//   });
// });
