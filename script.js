//Ниже реализация открытия и закрытия модальных окон
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//Общая функция для открытия и закрытия модальных окон
function PopupToggle(popup) {
  popup.classList.toggle('popup_opened');
} 

//Открытие и закрытие модального окна с редактированием профиля
const profilePopup = document.querySelector('.popup-profile');
const profileCloseButton = profilePopup.querySelector('.popup__button-close_profile');

editButton.addEventListener ('click', () => {
  PopupToggle(profilePopup);
});

profileCloseButton.addEventListener ('click', () => {
  PopupToggle(profilePopup);
});

//Открытие и закрытие модального окна с добавлением карточек
const elementPopup = document.querySelector('.popup-element');
const elementCloseButton = elementPopup.querySelector('.popup__button-close_element');

addButton.addEventListener ('click', () => {
  PopupToggle(elementPopup);
});

elementCloseButton.addEventListener ('click', () => {
  PopupToggle(elementPopup);
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


const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;

function renderElement (arreyElements) {
  const elementItem = elementTemplate.querySelector('.element').cloneNode(true);
  const photoElement = elementItem.querySelector('.element__photo');
  const titleElement = elementItem.querySelector('.element__title');

  titleElement.textContent = arreyElements.name;
  photoElement.src = arreyElements.link;

  //Ниже реализация лайка карточек 
  const likeButton = elementItem.querySelector('.element__button-like');

  function like(element) {
    element.classList.toggle('element__button-like_active');
  } 

  likeButton.addEventListener ('click', () => {
    like(likeButton);
  })

  return elementItem;
}

initialElements.forEach(function(element) {
  const card = renderElement(element);
  elements.prepend(card);
});