//Ниже реализация открытия и закрытия модальных окон
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//Общая функция для открытия и закрытия модальных окон
function PopupToggle(popup) {
  popup.classList.toggle('popup_opened');
} 

//Открытие и закрытие модального окна с редактированием профиля
const profilePopup = document.querySelector('.popup_profile');
const profileCloseButton = profilePopup.querySelector('.popup__button-close_profile');

editButton.addEventListener ('click', () => {
  PopupToggle(profilePopup);
});

profileCloseButton.addEventListener ('click', () => {
  PopupToggle(profilePopup);
});

//Открытие и закрытие модального окна с добавлением карточек
const elementPopup = document.querySelector('.popup_element');
const elementCloseButton = elementPopup.querySelector('.popup__button-close_element');

addButton.addEventListener ('click', () => {
  PopupToggle(elementPopup);
});

elementCloseButton.addEventListener ('click', () => {
  PopupToggle(elementPopup);
});

//Закрытие модального окна с изображением
const photoPopup = document.querySelector('.popup_photo');
const photoCloseButton = photoPopup.querySelector('.popup_photo__button-close');

photoCloseButton.addEventListener ('click', () => {
  PopupToggle(photoPopup);
});

//Ниже реализована функция редактирование имени и информации о себе
const profilePopupForm = document.querySelector('.popup__form_profile');
let nameInput = profilePopupForm.querySelector('.popup__input_type_name');
let jobInput = profilePopupForm.querySelector('.popup__input_type_job');

let nameProfile = document.querySelector('.profile__name');
let jobProfile =  document.querySelector('.profile__job');

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  PopupToggle(profilePopup);
}

profilePopup.addEventListener('submit', formSubmitHandler);

//Ниже реализована функция загрузки карточек из массива
const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const elementTemplate = document.querySelector('#element').content;

function renderElement (arreyElement) {
  const elementItem = elementTemplate.querySelector('.element').cloneNode(true);
  const photoElement = elementItem.querySelector('.element__photo');
  const titleElement = elementItem.querySelector('.element__title');

  titleElement.textContent = arreyElement.name;
  photoElement.src = arreyElement.link;

  //Ниже реализация лайка карточек 
  const likeButton = elementItem.querySelector('.element__button-like');

  function like(element) {
    element.classList.toggle('element__button-like_active');
  };

  likeButton.addEventListener ('click', () => {
    like(likeButton);
  });

  //Ниже реализация удаления карточки
  const deleteButton = elementItem.querySelector('.element__trash');

  deleteButton.addEventListener('click', () => {
    elementItem.remove();
  });

  //Ниже реализация открытия модального окна с изображением
  const photoPopup = document.querySelector('.popup_photo');

  photoElement.addEventListener ('click', () => {
    const imagePhotoPopup = document.querySelector('.popup_photo__image');
    imagePhotoPopup.src = arreyElement.link;
    const photoCaption = document.querySelector('.popup_photo__caption');
    photoCaption.textContent = arreyElement.name;
    PopupToggle(photoPopup);
  });

   return elementItem;
}

const elements = document.querySelector('.elements');

initialElements.forEach(function(element) {
  const card = renderElement(element);
  elements.prepend(card);
});

//Ниже реализация добавления карточки из модального окна
const elementPopupForm = document.querySelector('.popup__form_element');
const placeInput = document.querySelector('.popup__input_type_place');
const imageInput = document.querySelector('.popup__input_type_image');

elementPopupForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const arreyElements = {
    name: placeInput.value,
    link: imageInput.value,
  };

    placeInput.value = '';
    imageInput.value = '';
  
  elements.prepend(renderElement(arreyElements, elements));
  PopupToggle(elementPopup);
});
