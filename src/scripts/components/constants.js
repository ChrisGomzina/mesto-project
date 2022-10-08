//Нашла кнопки открытия модальных окон
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const buttonAvatar = document.querySelector('.profile__avatar-button');

//Нашла все модальные окна
export const profilePopup = document.querySelector('.popup_profile');
export const cardPopup = document.querySelector('.popup_element');
export const imagePopup = document.querySelector('.popup_photo');
export const avatarPopup = document.querySelector('.popup_avatar');

export const popups = document.querySelectorAll('.popup');

//Нашла кнопки закрытия модальных окон
export const buttonCloseProfilePopup = profilePopup.querySelector('.popup__button-close_profile');
export const buttonCloseCardPopup = cardPopup.querySelector('.popup__button-close_element');
export const buttonCloseImagePopup = imagePopup.querySelector('.popup_photo__button-close');

//Нашла книпки сабмита модальных окон
export const buttonSaveProfilePopup = document.querySelector('.popup__button-save_profile-popup');
export const buttonSaveElementPopup = document.querySelector('.popup__button-save_element-popup');
export const buttonSaveAvatarPopup = document.querySelector('.popup__button-save_avatar');
export const buttonsSave = document.querySelectorAll('.popup__button-save');

//Нашла имя и название професии на странице
export const nameProfile = document.querySelector('.profile__name');
export const jobProfile =  document.querySelector('.profile__job');
export const avatarProfile = document.querySelector('.profile__avatar');

//Нашла форму модального окна с редактированием профиля
export const profilePopupForm = document.querySelector('.popup__form_profile');
export const nameInput = profilePopupForm.querySelector('.popup__input_type_name');
export const jobInput = profilePopupForm.querySelector('.popup__input_type_job');

//Нашла форму модального окна с добавлением карточек
export const cardPopupForm = document.querySelector('.popup__form_element');
export const placeInput = document.querySelector('.popup__input_type_place');
export const imageInput = document.querySelector('.popup__input_type_image');

//Нашла форму обновления аватара
export const avatarPopupForm = document.querySelector('.popup__form_avatar');
export const avatarInput = document.querySelector('.popup__input_type_avatar');

//Нашла картинку и описание к ней в модальном окне с картинкой
export const photoImagePopup = imagePopup.querySelector('.popup_photo__image');
export const captionImagePopup = imagePopup.querySelector('.popup_photo__caption');

//Нашла темплейт в разметке
export const elementTemplate = document.querySelector('#element').content;

//Нашла контейнер, куда буду добавлять карточки
export const elements = document.querySelector('.elements');


