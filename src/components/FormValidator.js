export default class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);
  }

  //Проверка инпутов на валидность
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Неактивное состяние кнопки сабмита
  _disableSubmitButton() {
    this._buttonElement.setAttribute("disabled", true);
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  //Функция управления состоянием кнопки
  _setSubmitButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableSubmitButton();
    } else {
      this._buttonElement.removeAttribute("disabled", true);
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  // Функция добавления класса с ошибкой
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Функция удаления класса с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  //Скрытие всех ошибок
  _hideAllErrors() {
    const errorElements = Array.from(
      document.querySelectorAll(`.${this._errorClass}`)
    );
    const errorInputs = Array.from(
      document.querySelectorAll(`.${this._inputErrorClass}`)
    );
    errorElements.forEach((error) => {
      error.classList.remove(this._errorClass);
      error.textContent = "";
    });
    errorInputs.forEach((input) => {
      input.classList.remove(this._inputErrorClass);
    });
    this._disableSubmitButton();
  }

  //Проверка валидности формы
  _isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Установка слушателей
  _setEventListeners() {
    this._setSubmitButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._setSubmitButtonState();
      });
    });
  }

  //Валидация всех форм
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
