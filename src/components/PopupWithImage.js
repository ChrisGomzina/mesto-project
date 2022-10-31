//Функция отображения загрузки
export function loading(form, isLoading, typeSave) {
  const buttonSubmit = form.querySelector('.popup__button-save');
  if (isLoading) {
    buttonSubmit.textContent = 'Сохранение...'
  } else {
    if (typeSave) {
      buttonSubmit.textContent = 'Сохранить';
    } else {
      buttonSubmit.textContent = 'Создать';
    }
  }
}


// photoCard.addEventListener ('click', () => {
//   photoImagePopup.src = data.link;
//   photoImagePopup.alt = data.name;
//   captionImagePopup.textContent = data.name;
//   openPopup(imagePopup);
// });

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor() {
    super(popupSelector);
    this._imagePopup = popupSelector.querySelector('.popup_photo__image');
    this._captionPopup = popupSelector.querySelector('.popup_photo__caption');
  }

    //Функция открытия мадального окна
    open(data) {
      super.open();
      this._imagePopup.src = data.link;
      this._imagePopup.alt = data.name;
      this._captionPopup.textContent = data.name;
    }
}
