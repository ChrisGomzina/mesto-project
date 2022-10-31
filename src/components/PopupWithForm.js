import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__button-save");
    this._submitButtonText = this._submitButton.textContent;
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((inputElement) => {
      this._inputValues[inputElement.name] = inputElement.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}

// //Функция отображения загрузки
// export function loading(form, isLoading, typeSave) {
//   const buttonSubmit = form.querySelector(".popup__button-save");
//   if (isLoading) {
//     buttonSubmit.textContent = "Сохранение...";
//   } else {
//     if (typeSave) {
//       buttonSubmit.textContent = "Сохранить";
//     } else {
//       buttonSubmit.textContent = "Создать";
//     }
//   }
// }
