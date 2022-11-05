export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._escClose = this._handleEscClose.bind(this);
  }

  //Функция открытия мадального окна
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._escClose);
  }

  //Функция закрытия мадального окна
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._escClose);
  }

  //Закрытие модальных окон нажатием на esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //Закрытие модальных окон по клику на оверлей и кнопку закрытия
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      };
      if (evt.target.classList.contains('popup__button-close')) {
        this.close();
      };
    });
  }
}

