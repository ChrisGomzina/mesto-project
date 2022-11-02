import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = this._popup.querySelector('.popup_photo__image');
    this._captionPopup = this._popup.querySelector('.popup_photo__caption');
  }

    //Функция открытия мадального окна
    open(link, name) {
      super.open();
      this._imagePopup.src = link;
      this._imagePopup.alt = name;
      this._captionPopup.textContent = name;
    }
}
