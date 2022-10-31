export default class Card {
  constructor({data, cardSelector, userId, setLike, removeLike, handleDeleteCard, handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likesArray = data.likes;
    this._setLike = setLike;
    this._removeLike = removeLike;
    this._handleDeleteCard = handleDeleteCard;
    this._handleCardClick = handleCardClick;
    this._photoImagePopup = document.querySelector('.popup_photo__image');
    this._captionImagePopup = document.querySelector('.popup_photo__caption');
    this._imagePopup = document.querySelector('.popup_photo');
  }

  //Получаем темплейт карточки
   _getTemplate() {
      this._element = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return this._element;
  }

  _setEventListeners() {
    //Слушатель лайка карточек
    this._buttonLike.addEventListener ('click', () => {
      this._toggleLike(this._buttonLike, this._likeCounter, this._cardId);
    });

    //Реализация удаления карточки
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteCard(this._card, this._cardId);
    });

    //Реализация открытия модального окна с изображением
    this._photoCard.addEventListener ('click', () => {
      this._handleCardClick(this._photoImagePopup, this._captionImagePopup, this._imagePopup)
    });
  }

  createCard() {
    this._card = this._getTemplate();
    this._photoCard = this._card.querySelector('.element__photo');
    this._titleCard = this._card.querySelector('.element__title');

    this._buttonLike = this._card.querySelector('.element__button-like');
    this._buttonDelete = this._card.querySelector('.element__trash');
    this._likeCounter = this._card.querySelector('.element__like-counter');

    this._titleCard.textContent = this._name;
    this._photoCard.src = this._link;
    this._photoCard.alt = this._name;

    //Проверка id для удаления кнопки "удалить" из dom
    if (this._userId !== this._ownerId) {
      this._buttonDelete.remove();
    }

    //Проверка id для лайка
    if (this._likesArray.some(function() {
      return this._cardId === this._userId;
    })
    ) {
      this._buttonLike.classList.add('element__button-like_active');
    }

    this._likeCounter.textContent = this._likesArray.length;
    this._setEventListeners();

    return this._card;
  }

  toggleLike() {
    this._likesArray = data.likes;
    this._likeCounter.textContent = this._likes.length;
    this._buttonLike.classList.toggle('element__button-like_active');
  }

}



// //Функция создания карточки
// export function createCard(data) {
//   const card = elementTemplate.querySelector('.element').cloneNode(true);
//   const photoCard = card.querySelector('.element__photo');
//   const titleCard = card.querySelector('.element__title');

//   const buttonLike = card.querySelector('.element__button-like');
//   const buttonDelete = card.querySelector('.element__trash');
//   const likeCounter = card.querySelector('.element__like-counter');
//   const likesArray = data.likes;

//   let cardId = '';

//   titleCard.textContent = data.name;
//   photoCard.src = data.link;
//   photoCard.alt = data.name;
//   likeCounter.textContent = data.likes.length;
//   cardId = data._id;

//   //Проверка id для удаления кнопки "удалить" из dom
//   if (userId !== data.owner._id) {
//     buttonDelete.remove();
//   }

//   //Проверка id для лайка
//   if (likesArray.some(function(data) {
//     return data._id === userId;
//   })
//   ) {
//     buttonLike.classList.add('element__button-like_active');
//   }

//    //Слушатель лайка карточек
//   buttonLike.addEventListener ('click', () => {
//     toggleLike(buttonLike, likeCounter, cardId);
//   });

//   //Ниже реализация удаления карточки
//   buttonDelete.addEventListener('click', () => {
//     handleDeleteCard(card, cardId);
//   });

//   //Ниже реализация открытия модального окна с изображением
//   // photoCard.addEventListener ('click', () => {
//   //   photoImagePopup.src = data.link;
//   //   photoImagePopup.alt = data.name;
//   //   captionImagePopup.textContent = data.name;
//   //   openPopup(imagePopup);
//   // });

//   return card;
// }

// //Функция лайка и изменение количества лайков
// function toggleLike(button, counter, id) {
//   if (!button.classList.contains('element__button-like_active')) {
//     likeCard(id)
//     .then((res) => {
//       button.classList.add('element__button-like_active');
//       counter.textContent++;
//     })

//     .catch((err) => {
//       console.log(err);
//     });

//   } else {
//     dislikeCard(id)
//     .then((res) => {
//       button.classList.remove('element__button-like_active');
//       counter.textContent--;
//     })

//     .catch((err) => {
//       console.log(err);
//     });
//   }
// }

// //Удаление карточек
// function handleDeleteCard (card, id) {
//   deleteCard(id)
//   .then((res) => {
//     card.remove();
//   })

//   .catch((err) => {
//     console.log(err);
//   });
// }

// //Добавление карточек в разметку
// export function addCardToMarkup(card) {
//   elements.prepend(createCard(card));
// };
