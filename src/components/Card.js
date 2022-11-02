export default class Card {
  constructor(
    { data, handleLikeClick, handleRemoveClick, handleCardClick },
    cardSelector,
    userId,
    api
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likesArray = data.likes;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveClick = handleRemoveClick;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._api = api;

    this._photoImagePopup = document.querySelector(".popup_photo__image");
    this._captionImagePopup = document.querySelector(".popup_photo__caption");
    this._imagePopup = document.querySelector(".popup_photo");
  }

  //Приватный метод получения темплейта карточки
  _getTemplate() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return this._element;
  }

  //Приватный метод установки слушателей
  _setEventListeners() {
    //Слушатель лайка карточек
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeClick();
    });
    //Реализация удаления карточки
    this._buttonDelete.addEventListener("click", () => {
      this._handleRemoveClick();
    });
    //Реализация открытия модального окна с изображением
    this._photoCard.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  //Приватный метод обработки счетчика и кнопки лайка
  _toggleLike(data) {
    this._likeCounter.textContent = data.likes.length;
    this._buttonLike.classList.toggle("element__button-like_active");
  }

  //Публичный метод лайка карточки
  handleCardLike() {
    if (!this._buttonLike.classList.contains("element__button-like_active")) {
      this._api
        .likeCard(this._cardId)
        .then((item) => {
          this._toggleLike(item);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .unlikeCard(this._cardId)
        .then((item) => {
          this._toggleLike(item);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }



  //Публичный метод удаления карточки
  handleCardRemove() {
    this._api
      .deleteCard(this._cardId)
      .then(() => {
        this._element.closest(".element").remove();
      })
      .catch((err) => console.log(err));
  }

  //Публичный метод удаления карточки
  createCard() {
    this._card = this._getTemplate();
    this._photoCard = this._card.querySelector(".element__photo");
    this._titleCard = this._card.querySelector(".element__title");
    this._buttonLike = this._card.querySelector(".element__button-like");
    this._buttonDelete = this._card.querySelector(".element__trash");
    this._likeCounter = this._card.querySelector(".element__like-counter");
    this._titleCard.textContent = this._name;
    this._photoCard.src = this._link;
    this._photoCard.alt = this._name;
    this._likeCounter.textContent = this._likesArray.length;
    this._setEventListeners();
    //Проверка id для удаления кнопки "удалить" из dom
    if (this._userId !== this._ownerId) {
      this._buttonDelete.remove();
    }
    //Проверка id для лайка
    if (this._likesArray.find((item) => this._userId === item._id)) {
      this._buttonLike.classList.add("element__button-like_active");
    }
    return this._card;
  }
}
