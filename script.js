const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__button-close');

// Ниже реализация открытия и закрытия модальных окон 
function popupToggle() {
  popup.classList.toggle('popup_opened');
} 

editButton.addEventListener('click', () => {
  popupToggle();
});

closeButton.addEventListener('click', () => {
  popupToggle();
});

//Ниже реализована функция редактирование имени и информации о себе
const popupForm = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');

let nameProfile = document.querySelector('.profile__name');
let jobProfile =  document.querySelector('.profile__job');

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupToggle();
}

popupForm.addEventListener('submit', formSubmitHandler);

//Ниже реализован лайк карточки (позже нужно сделать, так чтобы лайк появлялся на той карточке, на которую нажали)
const element = document.querySelector('.element');
const likeButton = element.querySelectorAll('.element__button-like');

function like (event) {
  evt.target.classList.toggle('element__button-like_active');  
} 

likeButton.addEventListener ('click', () => {
  like (event);
});
