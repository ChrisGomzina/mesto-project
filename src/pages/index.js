import "./index.css";
import {
  buttonEdit,
  buttonAdd,
  buttonAvatar,
  profilePopupForm,
  nameInput,
  jobInput,
  cardPopupForm,
  avatarPopupForm,
  validationConfig,
  apiConfig,
  userNameSelector,
  userAboutSelector,
  userAvatarSelector,
  imagePopupSelector,
  cardTemplateSelector,
  popupProfileSelector,
  popupCardSelector,
  popupAvatarSelector
} from "./../utils/constants.js";
import Api from "../components/Api";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
export let userId;

//Создание экземпляра с api
const api = new Api(apiConfig);

//Отрисовка массива карточек
const cardsList = new Section(
  {
    renderer: (card) => {
      cardsList.addItem(generateCard(card));
    },
  }, ".elements"
  );

//Создание экземпляра с данными юзера
const userInfo = new UserInfo({
  userName: userNameSelector,
  userInfo: userAboutSelector,
  userAvatar: userAvatarSelector,
});

//Получение данных профиля и карточек с сервера
Promise.all([api.renderCards(), api.getProfileInfo()])
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

//Создание экземпляров карточек
const generateCard = (data) => {
  const card = new Card(
    {
      data: data,
      handleLikeClick: () => {
        card.handleCardLike();
      },
      handleRemoveClick: () => {
        card.handleCardRemove();
      },
      handleCardClick: () => {
        viewImagePopup.open(data.link, data.name);
      },
    },
    cardTemplateSelector, userId, api
  );
  const cardElement = card.createCard();
  return cardElement;
};

//Создание экземпляра попапа с формой редактирования профиля
const popupProfileEdit = new PopupWithForm({
  popupSelector: popupProfileSelector,
  submitCallback: (data) => {
    popupProfileEdit.renderLoading(true);
    console.log(data);
    api
      .patchProfileInfo(data.firstname, data.job)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupProfileEdit.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupProfileEdit.renderLoading(false));
  },
});

popupProfileEdit.setEventListeners();

buttonEdit.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  profilePopupFormValidate.resetValidation();
  popupProfileEdit.open();
});

//Создание экземпляра попапа с формой добавления карточки
const popupCardAdd = new PopupWithForm({
  popupSelector: popupCardSelector,
  submitCallback: (data) => {
    popupCardAdd.renderLoading(true);
    api
      .postNewCard(data)
      .then((data) => {
        cardsList.addItem(generateCard(data));
        popupCardAdd.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => popupCardAdd.renderLoading(false));
  },
});

popupCardAdd.setEventListeners();

buttonAdd.addEventListener("click", () => {
  cardPopupFormValidate.resetValidation();
  popupCardAdd.open();
});

//Создание экземпляра попапа с формой изменения аватара
const popupAvatarEdit = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  submitCallback: (data) => {
    popupAvatarEdit.renderLoading(true);
    api
      .patchProfileAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupAvatarEdit.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => popupAvatarEdit.renderLoading(false));
  },
});

popupAvatarEdit.setEventListeners();

buttonAvatar.addEventListener("click", () => {
  avatarPopupFormValidate.resetValidation();
  popupAvatarEdit.open();
});

//Создание экземпляра попапа с картинкой
const viewImagePopup = new PopupWithImage(imagePopupSelector);
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
