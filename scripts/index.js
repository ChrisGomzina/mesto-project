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

//Нашла книпки сабмита модальных окон
const buttonSaveProfilePopup = document.querySelector('.popup__button-save_profile-popup');
const buttonSaveElementPopup = document.querySelector('.popup__button-save_element-popup');

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
  document.addEventListener('keydown', keyHandler);
}

//Функция закрытия мадального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
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
  hideAllErrors(buttonSaveProfilePopup, validationConfig);
});

buttonCloseProfilePopup.addEventListener ('click', () => {
  closePopup(profilePopup);
});

//Открытие и закрытие модального окна с добавлением карточек
buttonAdd.addEventListener ('click', () => {
  openPopup(cardPopup);
  hideAllErrors(buttonSaveProfilePopup, validationConfig);
  cardPopupForm.reset();
});

buttonCloseCardPopup.addEventListener ('click', () => {
  closePopup(cardPopup);
});

//Закрытие модального окна с изображением
buttonCloseImagePopup.addEventListener ('click', () => {
  closePopup(imagePopup);
});

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save', 
  inactiveButtonClass: 'popup__button_state_disabled',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__input-error_active'
}; 

//Проверка инпутов на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

//Неактивное состяние кнопки сабмита
const disableSubmitButton = (buttonElement, config) => {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(config.inactiveButtonClass);
};

//Функция управления состоянием кнопки 
function setSubmitButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, config);
  } else {
    buttonElement.removeAttribute('disabled', true);
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

// Функция добавления класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Функция удаления класса с ошибкой
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

//Скрытие всех ошибок
const hideAllErrors = (buttonElement, config) => {
  const errorElements = Array.from(document.querySelectorAll(`.${config.errorClass}`));
  const errorInputs = Array.from(document.querySelectorAll(`.${config.inputErrorClass}`));
  errorElements.forEach((error) => {
    error.classList.remove(config.errorClass);
    error.textContent = "";
  });
  errorInputs.forEach((input) => {
    input.classList.remove(config.inputErrorClass);
  });
  disableSubmitButton(buttonElement, config);
};

//Проверка валидности формы
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}; 

//Установка слушателей
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector); 
  setSubmitButtonState(inputList, buttonElement, config);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      setSubmitButtonState(inputList, buttonElement, config);
    });
  });
}; 

//Валидация всех форм
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

enableValidation(validationConfig);

//Закрытие модального окна по клику на оверлей
document.addEventListener('mousedown', function(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
});

//Закрытие модального окна кнопкой escape
function keyHandler(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) {
      closePopup(activePopup);
    }
  }
};