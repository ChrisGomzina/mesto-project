//Нашла кнопки открытия модальных окон
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

//Нашла все модальные окна
const profilePopup = document.querySelector('.popup_profile');
const cardPopup = document.querySelector('.popup_element');
const imagePopup = document.querySelector('.popup_photo');

//Нашла кнопки закрытия модальных окон
const buttonCloseProfilePopup = profilePopup.querySelector('.popup__button-close_profile');
const buttonCloseCardPopup = cardPopup.querySelector('.popup__button-close_element');
const buttonCloseImagePopup = imagePopup.querySelector('.popup_photo__button-close');

//Нашла имя и название професии на странице
const nameProfile = document.querySelector('.profile__name');
const jobProfile =  document.querySelector('.profile__job');

//Нашла форму модального окна с редактированием профиля
const profilePopupForm = document.querySelector('.popup__form_profile');
const nameInput = profilePopupForm.querySelector('.popup__input_type_name');
const jobInput = profilePopupForm.querySelector('.popup__input_type_job');

//Нашла форму модального окна с добавлением карточек
const cardPopupForm = document.querySelector('.popup__form_element');
const placeInput = document.querySelector('.popup__input_type_place');
const imageInput = document.querySelector('.popup__input_type_image');

//Нашла картинку и описание к ней в модальном окне с картинкой
const photoImagePopup = imagePopup.querySelector('.popup_photo__image');
const captionImagePopup = imagePopup.querySelector('.popup_photo__caption');

//Нашла темплейт в разметке
const elementTemplate = document.querySelector('#element').content;

//Нашла контейнер, куда буду добавлять карточки
const elements = document.querySelector('.elements');

//Массив для карточек из коробки
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

//Функция открытия мадального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Функция закрытия мадального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Функция лайка карточки
function like(element) {
  element.classList.toggle('element__button-like_active');
};

//Ниже реализована функция загрузки карточек из массива
function renderElement (arreyElement) {
  const card = elementTemplate.querySelector('.element').cloneNode(true);
  const photoCard = card.querySelector('.element__photo');
  const titleCard = card.querySelector('.element__title');

  const buttonLike = card.querySelector('.element__button-like');
  const buttonDelete = card.querySelector('.element__trash');

  titleCard.textContent = arreyElement.name;
  photoCard.src = arreyElement.link;
  photoCard.alt = arreyElement.name; 

  //Ниже реализация лайка карточек 
  buttonLike.addEventListener ('click', () => {
    like(buttonLike);
  });

  //Ниже реализация удаления карточки
  buttonDelete.addEventListener('click', () => {
    card.remove();
  });

  //Ниже реализация открытия модального окна с изображением
  photoCard.addEventListener ('click', () => {
    photoImagePopup.src = arreyElement.link;
    photoImagePopup.alt = arreyElement.name;
    captionImagePopup.textContent = arreyElement.name;
    openPopup(imagePopup);
  });

   return card;
}

initialElements.forEach(function(element) {
  const card = renderElement(element);
  elements.prepend(card);
});

//Ниже реализована функция редактирование имени и информации о себе
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopup);
}

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
});

buttonCloseProfilePopup.addEventListener ('click', () => {
  closePopup(profilePopup);
});

//Открытие и закрытие модального окна с добавлением карточек
buttonAdd.addEventListener ('click', () => {
  openPopup(cardPopup);
});

buttonCloseCardPopup.addEventListener ('click', () => {
  closePopup(cardPopup);
});

//Закрытие модального окна с изображением
buttonCloseImagePopup.addEventListener ('click', () => {
  closePopup(imagePopup);
});
