export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save', 
  inactiveButtonClass: 'popup__button_state_disabled',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__input-error_active'
}; 

//Проверка инпутов на валидность
export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

//Неактивное состяние кнопки сабмита
export const disableSubmitButton = (buttonElement, config) => {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(config.inactiveButtonClass);
};

//Функция управления состоянием кнопки 
export function setSubmitButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, config);
  } else {
    buttonElement.removeAttribute('disabled', true);
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

// Функция добавления класса с ошибкой
export const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Функция удаления класса с ошибкой
export const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

//Скрытие всех ошибок
export const hideAllErrors = (buttonElement, config) => {
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
export const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}; 

//Установка слушателей
export const setEventListeners = (formElement, config) => {
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
export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};