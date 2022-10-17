import { validationConfig,
  profilePopupForm } from './constants.js';

export default class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
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
    disableSubmitButton();
  }

  //Проверка валидности формы
  _isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      showInputError(inputElement, errorMessage);
    } else {
      hideInputError(inputElement);
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

const profilePopupFormValidate = new enableValidation(validationConfig, profilePopupForm);

// export const validationConfig = {
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button-save",
//   inactiveButtonClass: "popup__button_state_disabled",
//   inputErrorClass: "popup__input_state_invalid",
//   errorClass: "popup__input-error_active",
// };

//Проверка инпутов на валидность
// export const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

//Неактивное состяние кнопки сабмита
// __disableSubmitButton = (buttonElement, data) => {
//   buttonElement.setAttribute("disabled", true);
//   buttonElement.classList.add(config.inactiveButtonClass);
// };

//Функция управления состоянием кнопки
// export function setSubmitButtonState(inputList, buttonElement, config) {
//   if (hasInvalidInput(inputList)) {
//     disableSubmitButton(buttonElement, config);
//   } else {
//     buttonElement.removeAttribute("disabled", true);
//     buttonElement.classList.remove(config.inactiveButtonClass);
//   }
// }

// Функция добавления класса с ошибкой
// export const showInputError = (
//   formElement,
//   inputElement,
//   errorMessage,
//   config
// ) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorClass);
// };

// Функция удаления класса с ошибкой
// export const hideInputError = (formElement, inputElement, config) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = "";
// };

//Скрытие всех ошибок
// export const hideAllErrors = (buttonElement, config) => {
//   const errorElements = Array.from(
//     document.querySelectorAll(`.${config.errorClass}`)
//   );
//   const errorInputs = Array.from(
//     document.querySelectorAll(`.${config.inputErrorClass}`)
//   );
//   errorElements.forEach((error) => {
//     error.classList.remove(config.errorClass);
//     error.textContent = "";
//   });
//   errorInputs.forEach((input) => {
//     input.classList.remove(config.inputErrorClass);
//   });
//   disableSubmitButton(buttonElement, config);
// };

//Проверка валидности формы
// export const isValid = (formElement, inputElement, config) => {
//   if (inputElement.validity.patternMismatch) {
//     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//   } else {
//     inputElement.setCustomValidity("");
//   }
//   if (!inputElement.validity.valid) {
//     showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       config
//     );
//   } else {
//     hideInputError(formElement, inputElement, config);
//   }
// };

//Установка слушателей
// export const setEventListeners = (formElement, config) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(config.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);
//   setSubmitButtonState(inputList, buttonElement, config);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       isValid(formElement, inputElement, config);
//       setSubmitButtonState(inputList, buttonElement, config);
//     });
//   });
// };

//Валидация всех форм
// export const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));

//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, config);
//   });
// };
